const authenticateCurrentUserByToken = require('../../../_helpers/authenticate-current-user-by-token')
const getTalentApplicationById = require('../../../_helpers/get-talent-application-by-id')

const apiTalentApplicationShow = async function (req, res) {
  const { locals: { currentApplication } } = res

  return res.status(200).json({ application: currentApplication })
}

module.exports = [authenticateCurrentUserByToken, getTalentApplicationById, apiTalentApplicationShow]
