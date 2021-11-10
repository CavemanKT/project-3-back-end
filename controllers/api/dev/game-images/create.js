const MulterParser = require('../../../../services/MulterParser')
const { body } = require('express-validator')

const { Image } = require('../../../../models/image')
const authenticateDevByToken = require('../../../_helpers/authenticate-dev-by-token')
const getDevGameById = require('../../../_helpers/get-dev-game-by-id')
// const checkValidation = require('../../../../helpers/check-validation')

const permittedFields = ['url1', 'url2', 'url3', 'GameId']
// const validations = [
//   body('url').default('').notEmpty().withMessage('Item Name is Required'),
//   body('checked').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
// ]

const apiDevGameImageCreate = async function (req, res) {
  const { body: { data }, files: { images } } = req
  const { locals: { currentGame } } = res

  const image = await currentGame.createImage(images, { fields: permittedFields })


  if (req.files && req.files.length > 0) {
    image.url1 = req.files[0].location
    image.url2 = req.files[1].location
    image.url3 = req.files[2].location
  }

  await image.save()
  await image.reload()
  return res.status(200).json({ image })
}

module.exports = [
  authenticateDevByToken,
  getDevGameById,
  MulterParser.any(),
  // MulterParser.fields([
  //   { name: 'image[url1]' },
  //   { name: 'image[url2]' },
  //   { name: 'image[url3]' }
  // ]),
  apiDevGameImageCreate
]
