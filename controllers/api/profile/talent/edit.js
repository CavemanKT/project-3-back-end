const { authenticateTalentUserByToken } = require('../../../_helpers')

const apiTalentProfileEdit = async function(req, res) {
  const {locals: {currentUser}} = res
  console.log('currentUser: ',currentUser);

  return res.status(200).json({currentUser})
}

module.exports = [
  authenticateTalentUserByToken('json'),
  apiTalentProfileEdit
]
