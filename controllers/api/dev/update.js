const { body } = require('express-validator')

const { Image } = require('../../../models')
const authenticateDevByToken = require('../../_helpers/authenticate-dev-by-token')
const getDevGameById = require('../../_helpers/get-dev-game-by-id')

const permittedFields = {
  Game: ['name', 'description', 'jobDescription', 'qualification'],
  Images: ['url']
}

// const validations = [
//   body('title').default('').notEmpty().withMessage('Title is Required'),
//   body('Images.*.name').default('').notEmpty().withMessage('Item Name is Required'),
//   body('Images.*.checked').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
// ]

const apiDevGameUpdate = async function (req, res) {
  const { body } = req
  const { locals: { currentGame } } = res

  await currentGame.update(body, { fields: permittedFields.Game })
  await currentGame.setImages([])

  if (body.Images && body.Images.length > 0) {
    for (imageBody of body.Images) {
      const ImageId = Number(imageBody.id || 0)
      let image = await Image.findOne({ where: { id: ImageId } })

      if (image) {
        await image.update(imageBody, { fields: permittedFields.Images })
        await currentGame.addImage(image)
      } else {
        await currentGame.createImage(imageBody, { fields: permittedFields.Images })
      }
    }

    await Image.destroy({ where: { GameId: null } })
  }

  await currentGame.reload()
  return res.status(200).json({ game: currentGame })
}

module.exports = [authenticateDevByToken, getDevGameById, apiDevGameUpdate]
