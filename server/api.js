var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = ('../config/db.js');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
var authRoutes = require('../routes/auth-routes');
var keys = require('../config/keys');
var ejs = require('ejs');

var app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/auth', authRoutes);





//
// console.log(process.env);

// var routes = require('./routes/index');
// var users = require('./routes/users');

//connect the database


//initialize the bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//initialize the passport

app.use(passport.initialize());
app.use(passport.session());

// module.exports = {
//     getPool: function () {
//       if (pool){
//       return pool;
//     } // if it is already there, grab it here
//       // pool = new pg.Pool(config);
//       // return pool;
// }};

app.listen(process.env.PORT || 2500, function () {
  console.log("Server is listening on port 2500. Ready to accept requests!");
});
