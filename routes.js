const { Router } = require('express')
const getCurrentUserByToken = require('./controllers/_helpers/get-current-user-by-token')

const router = Router()

// Middleware
router.use(getCurrentUserByToken)

// WELCOME
router.get('/', require('./controllers/api/welcome'))

// AUTH
router.post('/api/auth/signup', require('./controllers/api/auth/signup'))
router.post('/api/auth/login', require('./controllers/api/auth/login'))
router.delete('/api/auth/logout', require('./controllers/api/auth/logout'))

//PUBLIC
router.get('/api/games', require('./controllers/api/public/index'))
router.get('/api/games/:GameId', require('./controllers/api/public/show'))

//DEV GAMES
router.get('/api/dev/games', require('./controllers/api/dev/index'))
router.post('/api/dev/games', require('./controllers/api/dev/create'))
router.get('/api/dev/games/:GameId',  require('./controllers/api/dev/show'))
router.put('/api/dev/games/:GameId', require('./controllers/api/dev/update'))
router.delete('/api/dev/games/:GameId',  require('./controllers/api/dev/destroy'))

//DEV GAMES IMAGES
router.post('/api/dev/games/:GameId/images',require('./controllers/api/dev/game-images/create'))
router.put('/api/dev/games/:GameId/images', require('./controllers/api/dev/game-images/update'))
// router.delete('/api/dev/games/:GameId/images/:ImageId', require('./controllers/api/dev/game-images/destroy'))

//DEV GAMES APPLICATIONS
router.get('/api/dev/games/:GameId/applications', require('./controllers/api/dev/game-applications/index'))

//TALENT APPLICATIONS
router.get('/api/talent/applications', require('./controllers/api/talent/applications/index'))
router.get('/api/talent/applications/:GameId', require('./controllers/api/talent/applications/show'))

//TALENT GAMES APPLICATION
router.post('/api/talent/games/:GameId/applications', require('./controllers/api/talent/game-applications/create'))
router.delete('/api/talent/games/:GameId/applications', require('./controllers/api/talent/game-applications/destroy'))

//PROFILE
router.get('/api/profile', require('./controllers/api/profile/show'))
router.put('/api/profile', require('./controllers/api/profile/update'))

// Approve
router.get('/api/dev/approve/:GameId', require('./controllers/api/dev/game-applications/getApplicantApproval'))
router.put('/api/dev/approve/:GameId/:TalentId', require('./controllers/api/dev/game-applications/updateApprovedTrue'))
router.put('/api/dev/approved/:GameId/:TalentId', require('./controllers/api/dev/game-applications/updateApprovedFalse'))

module.exports = router
