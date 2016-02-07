// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');


// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://read:1234@ds047955.mongolab.com:47955/heroku_01d958lf');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Register all our routes with /api
app.use('/api', router);

// Create endpoint handlers for /beers
router.route('/beers')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);


app.listen(3000, function(){
    console.log('The server is running, ' +
        ' please, open your browser at http://localhost:%s',
        3000); });
