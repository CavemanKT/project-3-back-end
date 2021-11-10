const authenticateTalentByToken = require('../../../_helpers/authenticate-talent-by-token')
const getPublicGameById = require('../../../_helpers/get-public-game-by-id')

const { Application, Game } = require('../../../../models')

const permittedFields = ['GameId', 'TalentId', 'approved']

const apiTalentGameApplicationCreate = async function (req, res) {
  const { locals: { currentUser, currentGame } } = res
  const { params } = req


  const newApplication = await Application.create({
    GameId: currentGame.id,
    TalentId: currentUser.id,
  }, {
    fields: permittedFields,
    include: Application.Game
  })

  return res.status(200).json({ application: newApplication })
}

module.exports= [
  authenticateTalentByToken,
  getPublicGameById,
  apiTalentGameApplicationCreate
]
