const express = require('express')
const cookieParser = require('cookie-parser')
const userRoutes = require('../routes/userRoutes')
const companyRoutes = require('../routes/companyRoutes')
//passport
const { initializePassport } = require('../config/passport')
const expressSession = require('express-session') // session middleware
const passport = require('passport') // authentication

initializePassport(passport)
const app = express()

//middlewares

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use(expressSession({ secret: "secret", resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())


//after strategy we need to serialize and deserialize it 

// Use user routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', companyRoutes);


app.use(passport.session())

// Route to handle file upload


app.use(express.static('public'))
app.use('/images', express.static('images'))  //correct

module.exports = app

