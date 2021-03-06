const { Application } = require('../../models')

module.exports = async function(req, res, next) {
  const { locals: { currentUser } } = res
  const { params } = req

  const GameId = Number(params.GameId) || 0
  const application = await Application.findOne({ where: { GameId: GameId, TalentId: currentUser.id }})

  res.locals.currentApplication = application

  next()
}
