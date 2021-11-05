const authenticateTalentByToken = require('../../../_helpers/authenticate-talent-by-token')
const getTalentApplicationById = require('../../../_helpers/get-talent-application-by-id')

const apiTalentGameApplicationsDestroy = async function (req, res) {
  const { locals: { currentApplication } } = res

  await currentApplication.destroy()

  return res.status(204).json()
}

module.exports = [
  authenticateTalentByToken,
  getTalentApplicationById,
  apiTalentGameApplicationsDestroy
]
