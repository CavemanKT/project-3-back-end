module.exports = async function(req, res, next) {
  const { params } = req
  const { locals: { currentGame } } = res

  const ImageId = Number(params.ImageId) || 0
  const image = await currentGame.getImages({ where: { id: Number(ImageId) } })
  if (!image[0]) return res.status(404).json({ message: `Image with ID: ${params.id} not found!` })

  res.locals.currentImage = image[0]

  next()
}
