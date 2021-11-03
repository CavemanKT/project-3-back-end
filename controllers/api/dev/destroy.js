const authenticateDevUserByToken = require('../../_helpers/authenticate-dev-user-by-token')
const getDevGameById = require('../../_helpers/get-dev-game-by-id')

const apiDevGameDestroy = async function (req, res) {
  const { locals: { currentGame } } = res

  await currentGame.destroy()

  return res.status(204).json()
}

module.exports = [authenticateDevUserByToken, getDevGameById, apiDevGameDestroy]
