const { Application } = require('../../../../models')
const authenticateCurrentUserByToken = require('../../../_helpers/authenticate-current-user-by-token')

const apiTalentApplicationsIndex = async function (req, res) {
  const { locals: { currentUser } } = res

  const applications = await Application.findAll({
    where: {
      TalentId: currentUser.id
    }
  })

  return res.status(200).json({applications})
}

module.exports = [
  authenticateCurrentUserByToken,
  apiTalentApplicationsIndex
]
