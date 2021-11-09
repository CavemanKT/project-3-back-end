const { Application, Game, Talent,  } = require('../../../../models')
const authenticateTalentByToken = require('../../../_helpers/authenticate-talent-by-token')

const apiTalentApplicationsIndex = async function (req, res) {
  const { locals: { currentUser } } = res

  const applications = await Application.findAll({
    where: {
      TalentId: currentUser.id
    },
    include: Application.Game,
    order: [['createdAt', 'DESC']],
  })
console.log(applications);
  return res.status(200).json({applications})
}

module.exports = [
  authenticateTalentByToken,
  apiTalentApplicationsIndex
]
