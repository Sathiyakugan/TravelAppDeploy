const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var fs = require('fs');
var path = require('path');

// Bring in All Model
let User = require('../models/user');
let Appuser = require('../models/appuser');



// Insert Places
exports.insert = function(req, res,next) {
    var user;
    if (req.user.usertype === "admin"){
        user="admin";
    }
    else if(req.user.usertype === "staff"){
        user="staff"
    }

    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    const address = req.body.address;

    console.log(name);
    console.log(lastname);
    console.log(email);
    console.log(username);
    console.log(password);
    console.log(password2);
    console.log(address);

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('lastname', 'LastName is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    req.checkBody('address', 'Address is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render(user+'/addusers', {
            errors: errors
        });
    } else {
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            usertype: "appuser"
        });

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                else {
                    newUser.password = hash;
                    newUser.save(function (err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            console.log('success User added to database');
                            // res.redirect('/users/login');
                        }
                    });
                }

            });
        });
        let appuser = new Appuser({
            firstname: name,
            lastname: lastname,
            email: email,
            username: username,
            address: address
        });
        appuser.save(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log('success appuser added to database');
                req.flash('success', 'You are now registered and can log in');
                res.redirect('/'+user+'/users/view');
            }
        });

    }
};

// Add places
exports.add = function(req, res,next) {
    var user;
    if (req.user.usertype === "admin"){
        user="admin";
    }
    else if(req.user.usertype === "staff"){
        user="staff"
    }
    res.render(user+'/addusers', {title: 'Express'});

};

// View PLaces
exports.viewall = function(req, res,next) {
    var user;
    if (req.user.usertype === "admin"){
        user="admin";
    }
    else if(req.user.usertype === "appuser"){
        user="appuser"
    }
    else if(req.user.usertype === "staff"){
        user="staff"
    }

    Appuser.find({}, function (err, appusers) {
        if (err) {
            console.log(err);
        } else {
            res.render(user+'/viewusers', {
                appusers: appusers
            });
        }
    });
};

// View Places By ID
exports.viewbyid = function(req, res,next) {
    var user;
    if (req.user.usertype === "admin"){
        user="admin";
    }
    else if(req.user.usertype === "appuser"){
        user="appuser"
    }
    else if(req.user.usertype === "staff"){
        user="staff"
    }
    // console.log(req.params.id);
    Appuser.findById(req.params.id, function (err, user) {
        res.json(user)

        // res.render('admin/viewonestaff', {
        //     staff:staff
        // });
    });
};

