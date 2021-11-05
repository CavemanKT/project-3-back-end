const bcrypt = require("bcrypt")
const crypto = require('crypto')
// const { body } = require('express-validator')
const { Developer, Talent } = require('../../../models')

// const validation = [
//   body('email')
//     .notEmpty().withMessage('Email is Required')
//     .isEmail().withMessage('Email must be valid'),
//   body('password')
//     .notEmpty().withMessage('Password is Required')
// ]

const userSerializer = function(values) {
  const { ...user } = values.dataValues
  delete user.passwordHash
  return user
}

const apiAuthLogin = async function(req, res) {
  const { body: { email, password } } = req

  // Find the user
  let user = await Talent.findOne({ where: { email } })
  let type = 'Talent'
  if (!user) {
    user = await Developer.findOne({ where: { email } })
    type = 'Developer'
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash)
  if (!validPassword) return res.status(401).json({ message: 'Credentials is incorrect' })

  // Generate a token and set it as cookie
  const token = crypto.randomBytes(64).toString('hex')
  await user.createAuthenticityToken({ token })
  req.session.token = token
  req.session.type = type

  // Prevents the passwordHash from being sent!
  res.status(200).json(userSerializer(user))
}

module.exports = [
  apiAuthLogin
]
