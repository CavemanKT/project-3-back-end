const authenticateDevByToken = require('../../../_helpers/authenticate-dev-by-token')
const getDevGameById = require('../../../_helpers/get-dev-game-by-id')
const getDevGameApplicationById = require('../../../_helpers/get-dev-game-application-by-id')
const { Application } = require('../../../../models')

const permittedFields = {
  Application: ['approved']
}
const apiDevGameApplicationsUpdate = async function (req, res) {
  const { params: { GameId, TalentId} } = req

  const currentApplication = await Application.update({
    approved: true
  }, {
    where: {
      GameId,
      TalentId
    },
    fields: permittedFields.Application
  })

  return res.status(200).json({ application: currentApplication })
}

module.exports=[
  authenticateDevByToken,
  getDevGameById,
  // getDevGameApplicationById,
  apiDevGameApplicationsUpdate
]
