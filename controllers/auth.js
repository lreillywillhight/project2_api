const express = require('express');
const router = express.Router();
const db = require('../models');
// import middleware
const flash = require('flash');
const passport = require("../config/ppConfig");


// register get route
router.get('/register', function (req, res) {
    res.render('auth/register');
})
// register post route
router.post('/register', function (req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function ([user, created]) {
        // if user was created
        if (created) {
            db.favoritesSpaceX.create({
                userId: user.id,
                favoritesListSpaceX: []
            })
            db.favoritesImages.create({
                userId: user.id,
                favoritesListImages: []
            })
            db.favoritesNews.create({
                userId: user.id,
                favoritesListNews: []
            })
            console.log("User created! 🎉");
            passport.authenticate('local', {
                successRedirect: '/profile',
                successFlash: 'Thanks for registering'
            })(req, res)
        } else {
            console.log("User email already exists 🚫.");
            req.flash('error', 'Error: email already exists for user. Try again.');
            res.redirect('/auth/register');
        }
    }).catch(function (err) {
        console.log(`Error found. \nMessage: ${err.message}. \nPlease review - ${err}`);
        req.flash('error', err.message);
        res.redirect('auth/register');
    })
})


// login get route
router.get('/login', function (req, res) {
    res.render('auth/login');
});

// login post route
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (error, user, info) {
        // if no user authenticated
        if (!user) {
            req.flash('error', 'incorrect id/password')
            // console.log(req.flash('info')) //untested
            return res.redirect('/auth/login');
        }
        if (error) {
            return next(error);
        }

        req.login(user, function (error) {
            // if error move to error
            if (error) next(error);
            // if success flash success message
            req.flash('success', 'You are validated and logged in.');
            // if success save session and redirect user
            req.session.save(function () {
                return res.redirect('/profile');
            });
        })
    })(req, res, next);
})

// delete warning page GET
router.get('/deleteWarn', (req, res) => {
    res.render('auth/deleteWarn')
})

// delete GET route
router.get('/deleteUser', function (req, res) {
    res.render('auth/deleteUser');
});

// delete post route
router.post('/deleteUser', function (req, res, next) {
    passport.authenticate('local', function (error, user, info) {
        // if no user authenticated
        console.log('PPPPPPPPPPPPPPPP', user.id, 'PPPPPPPPPPPPPPPPPPPP')
        if (!user) {
            req.flash('error', 'incorrect id/password')
            // console.log(req.flash('info')) //untested
            return res.redirect('/auth/deleteWarn');
        }
        if (error) {
            return next(error);
        }

        req.login(user, function (error) {
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
            // if error move to error
            if (error) next(error);
            // if success flash success message
            console.log('0000000000000000',user,'0000000000000000')
            user.destroy()
            // db.users.findOne({ where: { id: user.id } })
                // .then(userZero => {
                //     userZero.destroy()
                        // if success delete user and send to main
                        res.redirect('/')
                // })
        })
    })(req, res, next);
})


router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    successFlash: 'Welcome to our app!',
    failureFlash: 'Invalid username or password.'
}));
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// export router
module.exports = router;