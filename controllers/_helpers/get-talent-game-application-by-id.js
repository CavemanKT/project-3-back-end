const { Application } = require('../../models')

module.exports = async function(req, res, next) {
  // const { locals: { currentGame } } = res
  const { params } = req

  const ApplicationId = Number(params.ApplicationId) || 0
  const GameId =Number(params.GameId) || 0
  const application = await Application.findOne({ where: { id: ApplicationId, GameId: GameId }})
  if (!application) return res.status(404).json({ message: `Application with ID: ${ApplicationId} not found!` })

  res.locals.currentApplication = application

  next()
}
