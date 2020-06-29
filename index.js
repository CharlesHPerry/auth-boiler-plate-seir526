//Require NPM libraries
require('dotenv').config();
const Express = require('express');
const ejsLayouts = require("express-ejs-layouts");
//passport, and custom middleware
const helmet = require('helmet');
const session = require('express-session');
const flash = require('flash');


// app setup
const app = Express();
app.use(Express.urlencoded({ extended: false}));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs')
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());


// ROUTES

app.get('/', (req, res) => {
    //check that user is logged in
    res.render('index');
})

//initialize app on port

app.listen(process.env.PORT || 3000, function() {
    console.log(`listening on port ${process.env.PORT} my duud 🌱`);
})