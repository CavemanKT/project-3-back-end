const { Router } = require('express')
const router = Router()

const {getDeveloperByToken} = require('../controllers/_helpers')
const {getTalentByToken} = require('../controllers/_helpers')

router.use(getDeveloperByToken)
router.use(getTalentByToken)


router.get('/', require('../controllers/api/welcome'))

router.use('/api', require('./api'))


module.exports = router
