const authenticateDevByToken = require('../../../_helpers/authenticate-dev-by-token')
const getDevGameById = require('../../../_helpers/get-dev-game-by-id')
const { Application } = require('../../../../models')

const permittedFields = {
  Application: ['approved']
}
const apiDevGameApplicationsUpdateApprovedToTrue = async function (req, res) {
  const { params: { GameId, TalentId} } = req

  await Application.update({
    approved: true
  }, {
    where: {
      GameId,
      TalentId
    },
    fields: permittedFields.Application
  })

  const currentApplication = await Application.findOne({
    where: {
      GameId,
      TalentId
    },
    include: Application.Talent
  })

  return res.status(200).json({ application: currentApplication })
}

module.exports=[
  authenticateDevByToken,
  getDevGameById,
  apiDevGameApplicationsUpdateApprovedToTrue
]
