// NPM libraries
require('dotenv').config()

const Express = require('express');
const ejsLayouts = require("express-ejs-layouts")
const helmet = require('helmet')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('./config/ppConfig')
const db = require('./models')
const isLoggedIn = require('./middleware/isLoggedIn')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const axios = require('axios')
// app setup
const app = Express()
app.use(Express.urlencoded({ extended: false }))
app.use(Express.static(__dirname + "/public"))
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(require('morgan')('dev'))
app.use(helmet())
// app.use(flash())

// create new instance of class Sequelize Store
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync()


// initialize passport and session info
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function (req, res, next) {
    res.locals.alert = req.flash()
    res.locals.currentUser = req.user

    next();
})





// ROUTES

app.get('/', (req, res) => {
    // check to see if user is logged in
    res.render('index', { messages: req.flash('info')})
})

app.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile')
})

app.get('/news', function (req, res) {
    var newsUrl = 'https://spaceflightnewsapi.net/api/v1/articles'
    axios.get(newsUrl).then(apiResponse => {
        var newsResult = apiResponse.data.docs
        res.render('newsIndex', {newsResult: newsResult})
    })
})

// app.get('/', function (req, res) {
//     res.render('index', { messages: req.flash('info') });
// })


// INCLUDE AUTH CONTROLLERS

app.use('/auth', require('./controllers/auth'))


// INITIALIZE APP ON PORT   

app.listen(process.env.PORT || 3000, function (port) { console.log(`port ${process.env.PORT}`) })