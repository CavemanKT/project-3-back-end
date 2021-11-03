const { authenticateTalentUserByToken } = require('../../../_helpers')

const apiTalentProfileEdit = async function(req, res) {
  const {locals: {talentUser}} = res
  console.log('talentUser: ',talentUser);

  return res.status(200).json({talentUser})
}

module.exports = [
  authenticateTalentUserByToken('json'),
  apiTalentProfileEdit
]
