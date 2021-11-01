const {Game} = require('../../../models')
const getGameById = require('../../_helpers/get-game-by-id')

const apiPublicGameShow = async function (req, res) {
  const { locals: { currentGame } } = res

  return res.status(200).json({ game: currentGame })
}

module.exports = [
  getGameById,
  apiPublicGameShow
]
