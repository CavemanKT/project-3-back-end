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
const userDeveloperSerializer = function(values) {
  const { ...developer } = values.dataValues
  delete developer.passwordHash
  return developer
}

const userTalentSerializer = function(values) {
  const { ...talent } = values.dataValues
  delete talent.passwordHash
  return talent
}

const apiAuthLogin = async function(req, res) {
  const { body: { email, password } } = req

  // Find the user
  let talent = await Talent.findOne({ where: { email } })
  if(talent !== null) {
    const validTalentPassword = await bcrypt.compare(password, talent.passwordHash)
    if (!validTalentPassword) return validDeveloperPassword

    // Generate a token and set it as cookie
    const token = crypto.randomBytes(64).toString('hex')
    await talent.createAuthenticityToken({ token })
    req.session.token = token

     // Prevents the passwordHash from being sent!
    res.status(200).json(userTalentSerializer(talent))
  } else {
    let developer = await Developer.findOne({ where: { email } })
    if (!developer) return res.status(404).json({ message: `User not found with email: ${email}` })

    const validDeveloperPassword = await bcrypt.compare(password, developer.passwordHash)
    if (!validDeveloperPassword) return res.status(401).json({ message: 'Credentials is incorrect' })

    const token = crypto.randomBytes(64).toString('hex')
    await developer.createAuthenticityToken({ token })
    req.session.token = token

    // Prevents the passwordHash from being sent!
    res.status(200).json(userDeveloperSerializer(developer))
  }
}

module.exports = [
  validation,
  apiAuthLogin
]
