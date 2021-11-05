const apiAuthLogout = async function(req, res) {
  req.session.token = ''
  req.session.type = ''
  res.status(204).json()
}

module.exports = [apiAuthLogout]
