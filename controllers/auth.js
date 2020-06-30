const express = require('express');
const router = express.Router();
const db = require('../models');
//import middleware
const flash = require('flash');
//TODO: update require below
const passport = require('passport');

//register get route
router.get('/register', function(req, res) {
    res.render('auth/register');
})

router.post('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function([user, created]) {
        // if user was created
        if (created) {
            //authenticate user and start authorization process
            console.log('user created 🤒')
            res.redirect('/')
        } else {
            console.log('user email already exists 🚫')
            req.flash('error', 'Error: email already exists for user. Try again.');
            res.redirect('/auth/register');
        }
    }).catch(function(err) {
        console.log(`Error found.\n ${err} -\n ${err.message}.`)
        req.flash('error', err.message);
        res.redirect('/auth/register');
    })
})

//login get route
router.get('/login', function(req, res) {
    res.render('auth/login');
})
//login Post route
//TODO: pass next param to function authenticate
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        if (!user) {
            req.flash('error', 'Invalid username or password');
            req.session.save(function() {
                return res.redirect('auth/login');
            })
            //redirect our user to try login again
        }
        if (error) {
            return next(error);
        }

        req.login(function(user, error) {
            //if error move to error
            if (error) next(error);
            //if success flash success
            req.flash('success', 'You are validated and logged in.')
            //if success save session and redirect user
            req.session.save(function() {
                return res.redirect('/');
            })
        })
    })
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    successFlash: 'welcome to our app!',
    failureFlash: 'Invalid username or password.'
}));


module.exports = router;