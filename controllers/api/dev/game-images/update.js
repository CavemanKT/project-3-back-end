const MulterParser = require('../../../../services/MulterParser')
const { body } = require('express-validator')

const { Image } = require('../../../../models')
const authenticateDevByToken = require('../../../_helpers/authenticate-dev-by-token')
const getDevGameById = require('../../../_helpers/get-dev-game-by-id')
const getImageById = require('../../../_helpers/get-image-by-id')


// const checkValidation = require('../../../../helpers/check-validation')


const permittedFields = ['url1', 'url2', 'url3']
// const validations = [
//   body('name').default('').notEmpty().withMessage('Item Name is Required'),
//   body('checked').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
// ]

const apiDevGameImageUpdate = async function (req, res) {
  const { body, files } = req
  const { locals: { currentImage, currentGame } } = res
  const { params: { GameId } } = req


  // only edit the image when uploading at least one image
  if(req?.files){
    if(req?.files?.[0]?.location || req?.files?.[1]?.location || req?.files?.[2]?.location){
      await currentImage.update({
        url1: req?.files?.[0]?.location,
        url2: req?.files?.[1]?.location,
        url3: req?.files?.[2]?.location
      }, {
        fields: permittedFields
      })
    }
  }


  await currentImage.save()
  await currentImage.reload()

  return res.status(200).json({ image: currentImage })
}

module.exports = [
  authenticateDevByToken,
  getDevGameById,
  getImageById,
  MulterParser.any(),
  apiDevGameImageUpdate
]
