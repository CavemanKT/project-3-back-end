const MulterParser = require('../../../../services/MulterParser')
const { body } = require('express-validator')

const authenticateCurrentUserByToken = require('../../../_helpers/authenticate-current-user-by-token')
const getDevGameById = require('../../../_helpers/get-dev-game-by-id')
// const checkValidation = require('../../../../helpers/check-validation')

const permittedFields = ['url', 'GameId']
// const validations = [
//   body('url').default('').notEmpty().withMessage('Item Name is Required'),
//   body('checked').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
// ]

const apiDevGameImageCreate = async function (req, res) {
  const { body } = req
  const { locals: { currentGame } } = res

  const image = await currentGame.createImage(body, { fields: permittedFields })

  if (req.files?.['url']?.[0]?.location) {
    image.url = req.files['url'][0].location
  }

  await image.save()
  await image.reload()

  return res.status(200).json({ image })
}

module.exports = [authenticateCurrentUserByToken, getDevGameById, MulterParser.single('url'), apiDevGameImageCreate]
