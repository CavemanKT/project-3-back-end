const getPublicGameById = require('../../_helpers/get-public-game-by-id')

const apiPublicGameShow = async function (req, res) {
  const { locals: { currentGame } } = res

  return res.status(200).json({ game: currentGame })
}

module.exports = [
  getPublicGameById,
  apiPublicGameShow
]
