const { body } = require('express-validator')

const { Game } = require('../../../models')
const authenticateCurrentUserByToken = require('../../_helpers/authenticate-current-user-by-token')

const permittedFields = ['name', 'description', 'jobDescription', 'qualification', 'Images.*.url']
// const validations = [
//   body('title').default('').notEmpty().withMessage('Title is Required'),
//   body('Images.*.name').default('').notEmpty().withMessage('Item Name is Required'),
//   body('Images.*.checked').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
// ]

const apiDevGameCreate = async function (req, res) {
  const { locals: { currentUser } } = res
  const { body: gameData } = req


  const game = await currentUser.createGame({...gameData}, { fields: permittedFields, include: Game.Images })

  return res.status(200).json({ game })
}

module.exports = [authenticateCurrentUserByToken, apiDevGameCreate]
