const { Application } = require('../../../../models')
const getTalentApplicationById = require('../../../../controllers/_helpers/get-talent-application-by-id')
const authenticateDevByToken = require('../../../_helpers/authenticate-dev-by-token')
const getDevGameById = require('../../../_helpers/get-dev-game-by-id')

const apiDevGameApplicationsIndex = async function (req, res) {
  const { locals: { currentGame, currentApplication } } = res

console.log(currentApplication);
  // const application = await Application.findOne({
  //   where: {
  //     GameId: currentGame.id
  //   },
  //   include: Application.Talent
  // })

  return res.status(200).json({currentApplication})
}

module.exports = [
  authenticateDevByToken,
  getDevGameById,
  apiDevGameApplicationsIndex
]
