const { Router } = require('express')
const router = Router()

// AUTH
router.post('/auth/signup', require('../controllers/api/auth/signup'))
router.post('/auth/login', require('../controllers/api/auth/login'))
router.delete('/auth/logout', require('../controllers/api/auth/logout'))

//PUBLIC
router.get('/games', require('../controllers/api/public/index'))
router.get('/games/:id', require('../controllers/api/public/show'))

//DEV GAMES
router.get('/dev/games', require('../controllers/api/dev/index'))
router.post('/dev/games', require('../controllers/api/dev/create'))

module.exports = router
