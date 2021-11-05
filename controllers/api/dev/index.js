const { Op } = require('sequelize')

const { Game } = require('../../../models')
const authenticateCurrentUserByToken = require('../../_helpers/authenticate-current-user-by-token')

const apiDevGameIndex = async function (req, res) {
  const { locals: { currentUser } } = res
  const { query } = req

  const q = query.q || ''
  const page = query.page || 1
  const limit = 10
  const offset = (page - 1) * limit
  const sortField = query.sortField || 'createdAt'
  const sortOrder = query.sortOrder || 'ASC'

  const result = await Game.findAndCountAll({
    where: {
      name: {
        [Op.iLike]: `%${q}%`
      },
      DeveloperId: currentUser.id
    },
    offset,
    limit,
    include: Game.Images,
    order: [[sortField, sortOrder]]
  })

  return res.status(200).json({ games: result.rows, meta: { totalPages: Math.floor(result.count / limit), currentPage: page } })
}

module.exports = [authenticateCurrentUserByToken('json'), apiDevGameIndex]
