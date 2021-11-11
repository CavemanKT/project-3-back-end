const authenticateDevByToken = require('../../_helpers/authenticate-dev-by-token')
const getDevGameById = require('../../_helpers/get-dev-game-by-id')
const { Application } = require('../../../models')

const apiDevGameDestroy = async function (req, res) {
  const { locals: { currentGame } } = res
  const { params: { GameId } } = req

  await currentGame.destroy()

  await Application.destroy({
    where: {
      GameId: currentGame.id
    }
  })

  return res.status(204).json()
}

module.exports = [
  authenticateDevByToken,
  getDevGameById,
  apiDevGameDestroy
]
