// Libraries used to create the server
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')
const methodOverride = require('method-override')
const morgan = require('morgan')
const router = require('./routes')

const app = express() // The instance that "host" our server
const port = process.env.PORT || 3000 // The port number our server runs on

const cookieOptions = {
  name: 'session',
  keys: [process.env.COOKIE_SECRET],
  // this is a secret string used to encrypt/decrypt cookie information
  // normally this key should be stored in environments
  // but for the sake of learning, we will leave this as is
}

if (process.env.NODE_ENV === 'production') {
  // Allows sending secure cookies
  app.set('trust proxy', 1)
  cookieOptions.sameSite = 'none'
  cookieOptions.secure = true
}

// Allow Cors Requests
app.use(cors({
  credentials: true,
  origin: process.env.CORS_ORIGIN
}))

// Parse url queries and json to object to be used in req.query and req.body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Parse cookies
app.use(cookieSession(cookieOptions))

// Give forms the ability to use DELETE and PUT method
app.use(methodOverride('_method'))

// Prints out request information
app.use(morgan('tiny'))

// Defining the routes for our server
app.use('/', router)

// Starts the server
app.listen(port, () => {

})
