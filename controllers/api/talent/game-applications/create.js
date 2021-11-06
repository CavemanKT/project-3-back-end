const authenticateTalentByToken = require('../../../_helpers/authenticate-talent-by-token')
const getPublicGameById = require('../../../_helpers/get-public-game-by-id')
const { Application } = require('../../../../models')

const permittedFields = ['GameId', 'TalentId', 'approved']

const apiTalentGameApplicationCreate = async function (req, res) {
  const { locals: { currentUser, currentGame } } = res
  const { body } = req

  const newApplication = await Application.create({
    GameId: currentGame.id,
    TalentId: currentUser.id
  }, {
    fields: permittedFields
  })

  return res.status(200).json({ newApplication })
}

module.exports= [
  authenticateTalentByToken,
  getPublicGameById,
  apiTalentGameApplicationCreate
]
