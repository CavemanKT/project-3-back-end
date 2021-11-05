const authenticateTalentByToken = require('../../../_helpers/authenticate-talent-by-token')
const getPublicGameById = require('../../../_helpers/get-public-game-by-id')

const permittedFields = ['GameId', 'TalentId', 'approved']

const apiTalentGameApplicationCreate = async function (req, res) {
  const { locals: { currentUser, currentGame } } = res
  const { params } = req

  const newApplication = await currentUser.createApplication(params, { fields: permittedFields })
  // newApplication.setGame(currentGame)

  return res.status(200).json({ newApplication })
}

module.exports= [
  authenticateTalentByToken,
  getPublicGameById,
  apiTalentGameApplicationCreate
]
