const { body } = require('express-validator')

const { Game } = require('../../../models')
const authenticateDevUserByToken = require('../../_helpers/authenticate-dev-user-by-token')

const permittedFields = ['name', 'description', 'jobDescription', 'qualification', 'Images.*.url']
// const validations = [
//   body('title').default('').notEmpty().withMessage('Title is Required'),
//   body('Images.*.name').default('').notEmpty().withMessage('Item Name is Required'),
//   body('Images.*.checked').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
// ]

const apiDevGameCreate = async function (req, res) {
  const { locals: { devUser } } = res
  const { body } = req

  const game = await devUser.createGame(body, { fields: permittedFields, include: Game.Images })
  return res.status(200).json({ game })
}

module.exports = [authenticateDevUserByToken, apiDevGameCreate]
