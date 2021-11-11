const authenticateDevByToken = require('../../_helpers/authenticate-dev-by-token')
const getDevGameById = require('../../_helpers/get-dev-game-by-id')
const getDevGameApplication = require('../../_helpers/get-dev-game-application-by-id')

const apiDevGameDestroy = async function (req, res) {
  const { locals: { currentGame } } = res
console.log(currentGame);
  await currentGame.destroy()

  return res.status(204).json()
}

module.exports = [
  authenticateDevByToken,
  getDevGameById,
  apiDevGameDestroy
]
