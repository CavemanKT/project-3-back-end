const { body } = require('express-validator')

const { Image } = require('../../../models')
const authenticateDevByToken = require('../../_helpers/authenticate-dev-by-token')
const getDevGameById = require('../../_helpers/get-dev-game-by-id')
const getImageById = require('../../_helpers/get-image-by-id')

const permittedFields = {
  Game: ['name', 'description', 'jobDescription', 'qualification'],
  Images: ['url1', 'url2', 'url3']
}

// const validations = [
//   body('title').default('').notEmpty().withMessage('Title is Required'),
//   body('Images.*.name').default('').notEmpty().withMessage('Item Name is Required'),
//   body('Images.*.checked').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
// ]

const apiDevGameUpdate = async function (req, res) {
  const { body } = req
  const { locals: { currentGame, currentImage } } = res
  const { params: { GameId } } = req
  // console.log('dev-update', body, currentGame.Images, GameId);
  await currentGame.update(body, { fields: permittedFields.Game })

  if(currentImage.url1 || currentImage.url2 || currentImage.url3){

  }

  await currentGame.reload()
  return res.status(200).json({ game: currentGame })
}

module.exports = [
  authenticateDevByToken,
  getDevGameById,
  getImageById,
  apiDevGameUpdate]
