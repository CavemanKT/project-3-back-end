const { Application } = require('../../../../models')
const authenticateDevByToken = require('../../../_helpers/authenticate-dev-by-token')
const getDevGameById = require('../../../_helpers/get-dev-game-by-id')

const apiDevGameApplicationsIndex = async function (req, res) {
  const { locals: { currentGame } } = res

  const applications = await Application.findAll({
    where: {
      GameId: currentGame.id
    }
  })

  return res.status(200).json({applications})
}

module.exports = [
  authenticateDevByToken,
  getDevGameById,
  apiDevGameApplicationsIndex
]
