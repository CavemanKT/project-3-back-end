const authenticateDevUserByToken = require('../../../_helpers/authenticate-dev-user-by-token')

const apiDevProfileEdit = async function(req, res) {
  const {locals: {currentUser}} = res
  console.log('currentUser: ', currentUser);

  return res.status(200).json({currentUser})
}

module.exports = [
  authenticateDevUserByToken('json'),
  apiDevProfileEdit
]
