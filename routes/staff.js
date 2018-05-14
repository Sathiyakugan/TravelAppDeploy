const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

var placeController = require('../controllers/placeController');
var userController = require('../controllers/userController');

// Bring in User Model
let User = require('../models/user');
let Staff = require('../models/staff');
let Appuser = require('../models/appuser');
let Chat = require('../models/chat');
let Place = require('../models/place');


/* GET home page. */


/* Routes for Users area*/
router.post('/users/add', ensureAuthenticationStaff, userController.insert);

router.get('/users/view', ensureAuthenticationStaff,userController.viewall);

router.get('/users/view/:id', ensureAuthenticationStaff, userController.viewbyid);

router.get('/users/add', ensureAuthenticationStaff, userController.add);


/* Routes for Places*/

router.post('/places/add', ensureAuthenticationStaff, placeController.insert);

router.get('/places/add', ensureAuthenticationStaff, placeController.add);

router.get('/places/view', ensureAuthenticationStaff,placeController.viewall);

router.get('/places/view/json', ensureAuthenticationStaff,placeController.viewalljson);

router.get('/places/view/:id', ensureAuthenticationStaff, placeController.viewbyid);

// Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/');
    }
}

// Access Control
function ensureAuthenticationStaff(req, res, next) {
    if (req.isAuthenticated() && req.user.usertype == "staff") {
        return next();
    }
    else if (req.isAuthenticated()) {
        req.flash('danger', 'Redirected to home');
        res.redirect('/');
    }
    else {
        req.flash('danger', 'Please login');
        res.redirect('/login');
    }
}


module.exports = router;
