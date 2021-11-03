const authenticateDevUserByToken = require('../../../_helpers/authenticate-dev-user-by-token')

const apiDevProfileEdit = async function(req, res) {
  const {locals: {devUser}} = res
  console.log('devUser: ', devUser);

  return res.status(200).json({devUser})
}

module.exports = [
  authenticateDevUserByToken('json'),
  apiDevProfileEdit
]
