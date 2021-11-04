const authenticateCurrentUserByToken = require('../../../_helpers/authenticate-current-user-by-token')
const getTalentGameApplicationById = require('../../../_helpers/get-talent-game-application-by-id')

const apiTalentGameApplicationsDestroy = async function (req, res) {
  const { locals: { currentApplication } } = res

  await currentApplication.destroy()

  return res.status(204).json()
}

module.exports = [authenticateCurrentUserByToken, getTalentGameApplicationById, apiTalentGameApplicationsDestroy]
