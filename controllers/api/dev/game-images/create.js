const MulterParser = require('../../../../services/MulterParser')
const { body } = require('express-validator')

const { Image } = require('../../../../models/image')
const authenticateDevByToken = require('../../../_helpers/authenticate-dev-by-token')
const getDevGameById = require('../../../_helpers/get-dev-game-by-id')
// const checkValidation = require('../../../../helpers/check-validation')

const permittedFields = ['url', 'GameId']
// const validations = [
//   body('url').default('').notEmpty().withMessage('Item Name is Required'),
//   body('checked').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
// ]

const apiDevGameImageCreate = async function (req, res) {
  const { body: { data } } = req
  const { locals: { currentGame } } = res
  console.log(">>>>>", req.body)
  console.log(">>>>>", req.file)

  const image = await currentGame.createImage(data, { fields: permittedFields })

  if (req?.file?.location) {
    image.url = req.file.location
  }

  await image.save()
  await image.reload()

  return res.status(200).json({ image })
}

module.exports = [
  authenticateDevByToken,
  getDevGameById,
  MulterParser.single('data[url]'),
  apiDevGameImageCreate
]
