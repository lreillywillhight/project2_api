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
const axios = require('axios');
const { sequelize } = require('./models');
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

app.get('/picOTDay', function(req,res) {
    var imgUrl = 'https://apod.nasa.gov/apod/'
    axios.get(imgUrl).then(apiResponse => {
        var imgResult = apiResponse.data
        // console.log(imgResult)
        res.render('potd', {imgResult: imgResult})
    })
})

app.get('/upcoming', function(req,res) {
    var upcomingUrl = 'https://api.spacexdata.com/v4/launches/upcoming'
    axios.get(upcomingUrl).then(apiResponse => {
        var upcomingResult = apiResponse.data
        // console.log(upcomingResult)
        res.render('upcoming', {upcomingResult: upcomingResult})
    })
})

app.get('/favorites/add', (req,res) => {
    db.favoritesSpaceX.update(
        {favoritesListSpaceX: sequelize.fn('array_append', sequelize.col('favoritesListSpaceX'), req.query.idx)},
        {where: {id: req.query.uid}}
    ).then
    console.log('added',db.favoritesSpaceX.findAll({where: {id : 1}}))
    res.render('favorites/add')
})

app.get('/favorites/delete', (req,res) => {
    let filterArray = function(entry) {
        return entry != req.query.idx
    }
    db.favoritesSpaceX.findOne({where: {id:req.query.uid}}).then(favorites => {
        newFavorites = favorites.favoritesListSpaceX.filter(filterArray)
        console.log(newFavorites)
        favorites.update({favoritesListSpaceX: newFavorites},
            {where: {id:req.query.uid}})
    }).then
    res.render('favorites/delete')
    // db.favoritesSpaceX.update(
    //     newFavorites = favoritesListSpaceX.filter(filterArray)
    //     {favoritesListSpaceX: newFavorites},
    //     {where: {id: req.query.uid}}
    // ).then
    // console.log('added',db.favoritesSpaceX.findAll({where: {id : 1}}))
    // res.render('favorites/delete')
})


// app.get('/favorites/delete', (req,res) => {
//     let newFavorites = []
//     db.favoritesSpaceX.findOne({where: {id:req.query.uid}}).
//     then(favorites => {
//         let filterArray = function(entry) {
//             return entry != req.query.idx
//         }
//         newFavorites = favorites.favoritesListSpaceX.filter(filterArray)
//         console.log(newFavorites)
//     }).then(newFaves => {

//     })
// })


// app.get('/', function (req, res) {
//     res.render('index', { messages: req.flash('info') });
// })


// INCLUDE AUTH CONTROLLERS

app.use('/auth', require('./controllers/auth'))


// INITIALIZE APP ON PORT   

app.listen(process.env.PORT || 3000, function (port) { console.log(`port ${process.env.PORT}`) })