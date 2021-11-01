const { Game } = require('../../models')

module.exports = async function(req, res, next) {
  const { locals: { currentUser } } = res
  const { params } = req

  const GameId = Number(params.GameId) || 0
  const game = await Game.findOne({ where: { id: GameId, DeveloperId: currentUser.id }, include: Game.Images })
  if (!game) return res.status(404).json({ message: `Game with ID: ${GameId} not found!` })

  res.locals.currentGame = game

  next()
}
