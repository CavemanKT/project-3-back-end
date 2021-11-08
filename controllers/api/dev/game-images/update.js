const MulterParser = require('../../../../services/MulterParser')
const { body } = require('express-validator')

const authenticateDevByToken = require('../../../_helpers/authenticate-dev-by-token')
const getDevGameById = require('../../../_helpers/get-dev-game-by-id')
const getImageById = require('../../../_helpers/get-image-by-id')
// const checkValidation = require('../../../../helpers/check-validation')

const permittedFields = ['url1']
// const validations = [
//   body('name').default('').notEmpty().withMessage('Item Name is Required'),
//   body('checked').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
// ]

const apiDevGameImageUpdate = async function (req, res) {
  const { body } = req
  const { locals: { currentImage } } = res

  await currentImage.update(body, { fields: permittedFields })

  if (req.files?.['url1']?.[0]?.location) {
    currentImage.url1 = req.files['url1'][0].location
  }

  await currentImage.save()
  await currentImage.reload()

  return res.status(200).json({ image: currentImage })
}

module.exports = [authenticateDevByToken, getDevGameById, getImageById, MulterParser.single('url1'), apiDevGameImageUpdate]
