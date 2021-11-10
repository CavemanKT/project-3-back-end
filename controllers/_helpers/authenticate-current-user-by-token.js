module.exports = async function(req, res, next) {
  // Since we used router.use(getUserByToken), we have access to currentUser in the controller too!
  const { locals: { currentUser, type } } = res

  // renders the home page and with a message.
  if (!currentUser) {
    return res.status(401).json({ message: 'Please Log In First!' })
  }
  next()
}
