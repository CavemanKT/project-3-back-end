const authenticateDevUserByToken = require('../../../_helpers/authenticate-dev-user-by-token')
// const MulterParser = require('../../../services/MulterParser')

const permittedFields = ['username', 'firstName', 'lastName', 'resume']

const apiDevUserProfileUpdate = async function (req, res) {
  const {locals: {devUser}} = res

    const newInfo = { ...req.body }

  // if (req.file && req.file.location) {
  //   newInfo.avatar = req.file.location
  // }

  await devUser.update(newInfo, {field: permittedFields})

  res.status(204).json()
}

module.exports=[
  authenticateDevUserByToken('html'),
  apiDevUserProfileUpdate
]
