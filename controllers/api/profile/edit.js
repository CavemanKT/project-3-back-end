const authenticateCurrentUserByToken = require('../../_helpers/authenticate-current-user-by-token')

const apiMyProfileEdit = async function(req, res) {
  const {locals: {currentUser}} = res
  console.log('currentUser: ', currentUser);

  return res.status(200).json({currentUser})
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  apiMyProfileEdit
]