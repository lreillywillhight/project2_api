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
const { response } = require('express');
const methodOverride = require('method-override');
const app = Express()
// app setup
app.use(methodOverride('_method'));
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
    var newsCurrent = 'https://spaceflightnewsapi.net/api/v1/articles'
    axios.get(newsCurrent).then(apiResponse => {
        var newsFront = apiResponse.data.docs
        // console.log(newsFront)
        res.render('index', { newsFront: newsFront })
    })
})

app.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile')
})

app.get('/upcoming', function (req, res) {
    var upcomingUrl = 'https://api.spacexdata.com/v4/launches/upcoming'
    axios.get(upcomingUrl).then(apiResponse => {
        var upcomingResult = apiResponse.data
        // console.log(upcomingResult)
        res.render('upcoming', { upcomingResult: upcomingResult })
    })
})


app.get('/faveNews', (req, res) => {
    db.favoritesNews.findOne({
        where: { userId: req.user.id }
    }).then(function (favorites) {
        res.render('faveNews', { favorites: favorites })
    })
})

app.get('/faveSpaceX', (req, res) => {
    db.favoritesSpaceX.findOne({
        where: { userId: req.user.id }
    }).then(function (favorites) {
        res.render('faveSpaceX', { favorites: favorites })
    })
})

app.get('/faveImage', (req, res) => {
    db.favoritesImages.findOne({
        where: { userId: req.user.id }
    }).then(function (favorites) {
        console.log(favorites)
        res.render('faveImage', { favorites: favorites })
    })
})

app.get('/images/add', (req, res) => {
    console.log(req.query.id, 'EEEEEEEEEEEEEEEEEE')
    db.favoritesImages.update({
        favoritesListImages: sequelize.fn('array_append', sequelize.col('favoritesListImages'), req.query.imageUrl)
    }, { where: { id: req.user.id } })
        .then
    console.log('BOOOOOOOOOOM')

    res.render('images/add')
})

app.post('/images/delete', (req,res) => {
    console.log('AAAAAAAAAAA',req.body.imageUrl)
    console.log('BBBBBBBBBBB',req.user.id)
    // console.log('DDDDDDDDDDD',currentUser.id)
    let filterArray = function (image) {
        return image != req.body.imageUrl
    }
    db.favoritesImages.findOne
        ({
            where: { id: req.user.id }
        }).then(favorites => {
            let newFavorites = favorites.favoritesListImages.filter(filterArray)
            console.log('CCCCCCCCCCCCCCCCC',newFavorites)
            favorites.update({ favoritesListImages: newFavorites },
                { where: { id: req.user.id } })
        }).then
    res.redirect('/faveImage')
})

app.get('/favorites/add', (req, res) => {
    db.favoritesSpaceX.update(
        { favoritesListSpaceX: sequelize.fn('array_append', sequelize.col('favoritesListSpaceX'), req.query.idx) },
        { where: { id: req.query.uid } }
    ).then
    console.log('added to favorites')
    res.render('favorites/add')
})

app.get('/favorites/delete', (req, res) => {
    let filterArray = function (entry) {
        return entry != req.query.idx
    }
    db.favoritesSpaceX.findOne
        ({
            where: { id: req.query.uid }
        }).then(favorites => {
            let newFavorites = favorites.favoritesListSpaceX.filter(filterArray)
            // console.log(newFavorites)
            favorites.update({ favoritesListSpaceX: newFavorites },
                { where: { id: req.query.uid } })
        }).then
    res.render('favorites/delete')
})



// app.get('/', function (req, res) {
//     res.render('index', { messages: req.flash('info') });
// })


// INCLUDE AUTH CONTROLLERS

app.use('/auth', require('./controllers/auth'))


// INITIALIZE APP ON PORT   

app.listen(process.env.PORT || 3000, function (port) { console.log(`port ${process.env.PORT}`) })