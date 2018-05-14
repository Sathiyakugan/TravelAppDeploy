const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var fs = require('fs');
var path = require('path');

// Bring in All Model
let User = require('../models/user');
let Staff = require('../models/staff');
let Appuser = require('../models/appuser');
let Chat = require('../models/chat');
let Place = require('../models/place');


// Display list of all Authors.
exports.viewUser = function(req, res,next) {
    Appuser.find({}, function (err, appusers) {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/viewusers', {
                appusers: appusers
            });
        }
    });
};

