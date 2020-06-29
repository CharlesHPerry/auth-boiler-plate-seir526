const express = require('express');
const router = express.Router();
const db = require('../models');
//import middleware
const flash = require('flash');

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



module.exports = router;