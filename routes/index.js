const { Router } = require('express')
const router = Router()

router.get('/', require('../controllers/api/welcome'))

// Your routes should all be under '/api'
// router.get('/api/some/collection', require('../some/controller'))

// Or create another route file to handle everything for '/api'
// router.use('/api', require('./api'))

module.exports = router
