const { Router } = require('express')
const router = Router()

const {getDeveloperByToken} = require('../controllers/_helpers')
const {getTalentByToken} = require('../controllers/_helpers')

router.get('/', require('../controllers/api/welcome'))

router.use('/api', getDeveloperByToken, getTalentByToken, require('./api'))



module.exports = router
