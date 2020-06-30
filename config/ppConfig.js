// import necessary libraries
const passport = require("passport");
const localStrategy = require('passport-local').Strategy;
const db = require('../models');
const user = require("../models/user");

//serialize user
passport.serializeUser(function(user, callback) {
 callback(null, user.id);
})
//deserialize version
passport.deserializeUser(function(id, callback){
    db.user.findByPk(id).then(function(user) {
     callback(null, user);
    }).catch(callback);
})
//config local variable/settings
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},function(email, password, callback) {
    db.user.findOne({ where: { email }}).then(function(user) {
        if (!user || !user.validPassword(password)) {
            callback(null, false)
        } else {
            callback(null, user);
        }
    }).catch(callback); 
}));




module.exports = passport