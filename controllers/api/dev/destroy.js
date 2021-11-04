const authenticateCurrentUserByToken = require('../../_helpers/authenticate-current-user-by-token')
const getDevGameById = require('../../_helpers/get-dev-game-by-id')

const apiDevGameDestroy = async function (req, res) {
  const { locals: { currentGame } } = res

  await currentGame.destroy()

  return res.status(204).json()
}

module.exports = [authenticateCurrentUserByToken('json'), getDevGameById, apiDevGameDestroy]
