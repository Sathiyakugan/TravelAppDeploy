const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
let Chat = require('../models/chat');


// Bring in User Model
let User = require('../models/user');
var authController = require('../controllers/authController');

// Usercheck
router.get('/usercheck',authController.usercheck);

// GET home page
router.get('/', ensureAuthenticated,authController.loginredirect);

// Register Form
router.get('/register', authController.register);

// Register Proccess
router.post('/register',authController.registerpost);

// Login Form
router.get('/login', authController.login);

// Login Process
router.post('/login',authController.loginpost);

// logout
router.get('/logout', authController.logout);

// Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/login');
    }
}


// Access Control
function ensureAuthenticationAdmin(req, res, next) {
    if (req.isAuthenticated() && (req.user.usertype == "admin")) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/login');
    }
}

// Access Control
function ensureAuthenticationAdminStaff(req, res, next) {
    if (req.isAuthenticated() && ( (req.user.usertype == "admin") || (req.user.usertype == "staff"))) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/login');
    }
}

function ensureAuthenticationStaff(req, res, next) {
    if (req.isAuthenticated() && req.user.usertype == "staff") {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/login');
    }
}

module.exports = router;
