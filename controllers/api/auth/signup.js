const bcrypt = require("bcrypt")
const crypto = require('crypto')
const {Developer, Talent} = require('../../../models')

const permittedSignupParams = ['username','email', 'passwordHash','type']

const userSerializer = function(values) {
  const { ...talent } = values.dataValues
  delete talent.passwordHash
  return talent
}

const apiAuthSignup = async function(req, res) {
  const { body: userParams } = req

  let type = req.body.type === "Marketer" ? 'Talent' : 'Developer'
  let user = null

  if (type === 'Talent') {
    user = await Talent.build(userParams, { attributes: permittedSignupParams })
  } else {
    user = await Developer.build(userParams, { attributes: permittedSignupParams })
  }

  user.passwordHash = await bcrypt.hash(userParams.password, 10)
  await user.save()

  const token = crypto.randomBytes(64).toString('hex')
  await user.createAuthenticityToken({ token })
  req.session.token = token
  req.session.type = type

  res.status(200).json(userSerializer(user))
}

module.exports = [
  apiAuthSignup
]
