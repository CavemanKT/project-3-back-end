const { Op } = require("sequelize")
const { Game} = require('../../../models')

const apiPublicGameIndex = async function (req, res) {
  const {locals: {currentUser}} = res
  const { query } = req

  const q = query.q || ''
  const page = Number(query.page) || 1
  const limit = 10
  const offset = (page - 1) * limit

  const results = await Game.findAndCountAll({
    where: {
      name: {
        [Op.iLike]: `%${q}%`
      }
    },
    order: [['createdAt', 'ASC']],
    limit,
    offset
  })

  return res.status(200).json({ games: results.rows, meta: { totalPages: Math.floor(results.count / limit), currentPage: page } })
}

module.exports = [apiPublicGameIndex]
