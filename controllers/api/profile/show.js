const apiProfileShow = async function (req, res) {
  const { locals: { currentUser } } = res

  if (!currentUser) {
    return res.status(401).json({ message: 'Please Log In First!' })
  }

  return res.status(200).json({ currentUser })
}

module.exports = [
  apiProfileShow
]
