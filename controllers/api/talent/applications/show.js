const authenticateTalentByToken = require('../../../_helpers/authenticate-talent-by-token')
const getCurrentUserByToken = require('../../../../controllers/_helpers/get-current-user-by-token')
const getGameById = require('../../../../controllers/_helpers/get-public-game-by-id')
const getTalentApplicationById = require('../../../../controllers/_helpers/get-talent-application-by-id')


const apiTalentApplicationShow = async function (req, res) {
  const { locals: { currentGame, currentApplication } } = res

console.log('currentApplication in show page',currentApplication);

  return res.status(200).json({ currentGame: currentGame, currentApplication: currentApplication })
}

module.exports = [
  authenticateTalentByToken,
  getCurrentUserByToken,
  getTalentApplicationById,
  getGameById,
  apiTalentApplicationShow
]
