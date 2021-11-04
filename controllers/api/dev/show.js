const authenticateCurrentUserByToken = require('../../_helpers/authenticate-current-user-by-token')
const getDevGameById = require('../../_helpers/get-dev-game-by-id')

const apiDevGameShow = async function (req, res) {
  const { locals: { currentGame } } = res

  return res.status(200).json({ game: currentGame })
}

module.exports = [authenticateCurrentUserByToken, getDevGameById, apiDevGameShow]
