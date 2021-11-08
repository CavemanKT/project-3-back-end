const authenticateDevByToken = require('../../../_helpers/authenticate-dev-by-token')
const getDevGameById = require('../../../_helpers/get-dev-game-by-id')
const getImageById = require('../../../_helpers/get-image-by-id')

const apiDevGameImageDestroy = async function (req, res) {
  const { locals: { currentImage } } = res

  await currentImage.destroy()

  return res.status(204).json()
}

module.exports = [authenticateDevByToken, getDevGameById, getImageById, apiDevGameImageDestroy]
