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
let DeletedUser = require('../models/deleteduser');

// Display list of all Authors.
// Insert Staffs
exports.insert = function(req, res,next) {
    var user;
    if (req.user.usertype === "admin"){
        user="admin";
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
        res.render(user+'/addstaffs', {
            errors: errors
        });
    } else {
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            usertype: "staff"
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
        let newStaff = new Staff({
            firstname: name,
            lastname: lastname,
            email: email,
            username: username,
            address: address
        });
        newStaff.save(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log('success Admins added to database');
                req.flash('success', 'You are now registered and can log in');
                res.redirect('/'+user+'/staffs/view');
            }
        });

    }
};

// Add Staffs
exports.add = function(req, res,next) {
    var user;
    if (req.user.usertype === "admin"){
        user="admin";
    }
    res.render(user+'/addstaffs', {title: 'AddStaffs'});

};

// View Staffs
exports.viewall = function(req, res) {
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

    Staff.find({}, function (err, staffs) {
        if (err) {
            console.log(err);
        } else {
            res.render(user+'/viewstaffs', {
                staffs: staffs
            });
        }
    });
};

// View Staffs By ID
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
    Staff.findById(req.params.id, function (err, staff) {
        res.render(user+'/viewonestaff', {
            staff: staff
        });
    });
};

exports.editbyid = function(req, res,next) {
    var user;
    if (req.user.usertype === "admin"){
        user="admin";
    }

    let staff = {};
    staff.firstname = req.body.name;
    staff.lastname = req.body.lastname;
    staff.address = req.body.address;

    let query = {_id:req.params.id}

    Staff.update(query, staff, function(err){
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'Staff Updated');
            res.redirect('/admin/staffs/view/'+req.params.id);
        }
    });
};

exports.deletebyid = function(req, res,next) {
    var user;
    if (req.user.usertype === "admin"){
        user="admin";
    }

    if(!req.user._id){
        res.status(500).send();
    }

    let query = {_id:req.params.id}

    Staff.findById(req.params.id, function(err, staff){
        if(req.user.usertype=="admin"){
            let queryusername = {username:staff.username}

            User.find(queryusername, function(err, user){
                let newDeletedUser = new DeletedUser({
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    usertype: "staff"
                });

                newDeletedUser.save(function (err) {
                    if (err) {
                        res.status(500).send();
                        console.log(err);
                        return;
                    } else {
                        console.log('success DeletedUser added to database');
                        // res.redirect('/users/login');
                    }
                });

                User.remove(queryusername, function(err){
                    if(err){
                        console.log(err);
                        res.status(500).send()
                    }
                    console.log('Success');
                });
            });

            Staff.remove(query, function(err){
                if(err){
                    console.log(err);
                    res.status(500).send()
                }
                res.send('Success');
            });
        } else {
            res.status(500).send();
        }
    });
};

exports.test=function(){
    Staff.find({}, function (err, staffs) {
        if (err) {
            return err;
        } else {
            let results={ staffs: staffs }
            return results;
        }
    });
}



