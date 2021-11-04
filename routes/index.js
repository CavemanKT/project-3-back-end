const { Router } = require('express')
const router = Router()

const {getCurrentUserByToken} = require('../controllers/_helpers')

router.use(getCurrentUserByToken)

router.get('/', require('../controllers/api/welcome'))

router.use('/api', require('./api'))


module.exports = router
