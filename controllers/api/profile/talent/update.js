const authenticateTalentUserByToken = require('../../../_helpers/authenticate-talent-user-by-token')
// const MulterParser = require('../../../services/MulterParser')

const permittedFields = ['username', 'firstName', 'lastName', 'resume']

const apiTalentUserProfileUpdate = async function (req, res) {
  const {locals: {talentUser}} = res

    const newInfo = { ...req.body }

  // if (req.file && req.file.location) {
  //   newInfo.avatar = req.file.location
  // }

  await talentUser.update(newInfo, {field: permittedFields})

  res.status(204).json()
}

module.exports=[
  authenticateTalentUserByToken('html'),
  apiTalentUserProfileUpdate
]
