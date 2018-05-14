const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var fs = require('fs');
var path = require('path');

var adminController = require('../controllers/adminController');
var placeController = require('../controllers/placeController');
var userController = require('../controllers/userController');
var staffController = require('../controllers/staffController');
var reportController = require('../controllers/reportController');
// Bring in All Model
let User = require('../models/user');
let Staff = require('../models/staff');
let Chat = require('../models/chat');


/* Routes for Places*/

router.post('/places/add', ensureAuthenticationAdmin, placeController.insert);

router.get('/places/add', ensureAuthenticationAdmin, placeController.add);

router.get('/places/view', ensureAuthenticationAdmin,placeController.viewall);

router.get('/places/view/json', ensureAuthenticationAdmin,placeController.viewalljson);

router.get('/places/view/:id', ensureAuthenticationAdmin, placeController.viewbyid);


/* Routes for Staffs area*/
router.post('/staffs/add', ensureAuthenticationAdmin, staffController.insert);

router.get('/staffs/add', ensureAuthenticationAdmin, staffController.add);

router.get('/staffs/view', ensureAuthenticationAdmin,staffController.viewall);

router.get('/staffs/view/:id', ensureAuthenticationAdmin, staffController.viewbyid);

router.post('/staffs/edit/:id', ensureAuthenticationAdmin, staffController.editbyid);

router.delete('/staffs/delete/:id', ensureAuthenticationAdmin, staffController.deletebyid);

/* Routes for Staffs area*/
router.post('/users/add', ensureAuthenticationAdmin, userController.insert);

router.get('/users/view', ensureAuthenticationAdmin,userController.viewall);

router.get('/users/view/:id', ensureAuthenticationAdmin, userController.viewbyid);

router.get('/users/add', ensureAuthenticationAdmin, userController.add);

//Report
router.get('/report', ensureAuthenticationAdmin, reportController.view);

//Chat

router.get('/chat', ensureAuthenticationAdmin, function (req, res, next) {
    Chat.find({}, function (err, chats) {
        if (err) {
            console.log(err);
        } else {
            res.render("admin/chat", {
                username: req.user.username,
                chats: chats
            });
        }
    });
});


/*
Functions to check the authenticity
 */

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
function ensureAuthenticationAdmin(req, res, next) {
    if (req.isAuthenticated() && (req.user.usertype == "admin")) {
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
