const bcrypt = require("bcrypt")
const { body } = require('express-validator')
const {Developer, Talent} = require('../../../models')

const permittedSignupParams = ['username','email', 'passwordHash','type']

const userSerializer = function(values) {
  const { ...talent } = values.dataValues
  delete talent.passwordHash
  return talent
}

const apiAuthSignup = async function(req, res) {
  const { body: userParams } = req

  if (req.body.type === "Marketer") {
    const talent = await Talent.build(userParams, { attributes: permittedSignupParams })

    talent.passwordHash = await bcrypt.hash(userParams.password, 10)
    await talent.save()

    res.status(200).json(userSerializer(talent))
  }else {
    const developer = await Developer.build(userParams, { attributes: permittedSignupParams })
    // Set the passwordHash with the hashed password with 10 rounds of salting
    developer.passwordHash = await bcrypt.hash(userParams.password, 10)
    // Saves the user
    await developer.save()

    res.status(200).json(userSerializer(developer))
  }
}

module.exports = [
  // apiAuthDeveloperSignup,
  apiAuthSignup
]
