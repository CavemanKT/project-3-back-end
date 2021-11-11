module.exports = async function(req, res, next) {
  const { params } = req
  const { locals: { currentGame } } = res

  const ImageId = Number(currentGame.Images[0].id) || 0
  const image = await currentGame.getImages({ where: { id: ImageId } })
  console.log(image[0]);

  res.locals.currentImage = image[0]

  next()
}
