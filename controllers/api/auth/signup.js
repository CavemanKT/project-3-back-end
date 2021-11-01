const bcrypt = require("bcrypt")
const { body } = require('express-validator')
const {Developer, Talent} = require('../../../models')

const permittedSignupParams = ['username','email', 'passwordHash']

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

const apiAuthDeveloperSignup = async function(req, res) {
  const { body: DeveloperParams } = req

  const developer = await Developer.build(DeveloperParams, { attributes: permittedSignupParams })
  // Set the passwordHash with the hashed password with 10 rounds of salting
  developer.passwordHash = await bcrypt.hash(DeveloperParams.password, 10)
  // Saves the user
  await developer.save()

  // Prevents the passwordHash from being sent!
  res.status(200).json(userDeveloperSerializer(developer))
}

const apiAuthTalentSignup = async function(req, res) {
  const { body: TalentParams } = req

  const talent = await Developer.build(TalentParams, { attributes: permittedSignupParams })
  // Set the passwordHash with the hashed password with 10 rounds of salting
  talent.passwordHash = await bcrypt.hash(TalentParams.password, 10)
  // Saves the user
  await talent.save()

  // Prevents the passwordHash from being sent!
  res.status(200).json(userTalentSerializer(talent))
}

module.exports = [
  apiAuthDeveloperSignup,
  apiAuthTalentSignup
]
