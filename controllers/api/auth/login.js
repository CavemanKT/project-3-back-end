const bcrypt = require("bcrypt")
const crypto = require('crypto')
const { body } = require('express-validator')
const { Developer, Talent, AuthenticityToken } = require('../../../models')

const validation = [
  body('email')
    .notEmpty().withMessage('Email is Required')
    .isEmail().withMessage('Email must be valid'),
  body('password')
    .notEmpty().withMessage('Password is Required')
]
//developer
const userSerializer = function(values) {
  const { ...developer } = values.dataValues
  delete developer.passwordHash
  return developer
}

const apiAuthLogin = async function(req, res) {
  const { body: { email, password } } = req

  // Find the user
  let talent = await Talent.findOne({ where: { email } })

  const validTalentPassword = await bcrypt.compare(password, talent.passwordHash)
  if (!validTalentPassword) return validDeveloperPassword

  // Generate a token and set it as cookie
  const token = crypto.randomBytes(64).toString('hex')
  await talent.createAuthenticityToken({ token })
  req.session.token = token

   // Prevents the passwordHash from being sent!
  res.status(200).json(userSerializer(talent))

  if (!talent) {
    let developer = await Developer.findOne({ where: { email } })
    if (!developer) return res.status(404).json({ message: `User not found with email: ${email}` })

    const validDeveloperPassword = await bcrypt.compare(password, developer.passwordHash)
    if (!validDeveloperPassword) return res.status(401).json({ message: 'Credentials is incorrect' })

    const token = crypto.randomBytes(64).toString('hex')
    await developer.createAuthenticityToken({ token })
    req.session.token = token

    // Prevents the passwordHash from being sent!
    res.status(200).json(userSerializer(developer))
  }
}

module.exports = [
  validation,
  apiAuthLogin
]
