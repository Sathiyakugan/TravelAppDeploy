const express = require('express');
const router = express.Router();

var placeController = require('../controllers/placeController');
// Bring in User Model



/* Routes for Places*/

router.get('/places/view', ensureAuthenticationAppUser,placeController.viewall);

router.get('/places/view/json', ensureAuthenticationAppUser,placeController.viewalljson);

router.get('/places/view/:id', ensureAuthenticationAppUser, placeController.viewbyid);


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
function ensureAuthenticationAppUser(req, res, next) {
    if (req.isAuthenticated() && req.user.usertype == "appuser") {
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
