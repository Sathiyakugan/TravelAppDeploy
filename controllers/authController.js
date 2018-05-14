const bcrypt = require('bcryptjs');
const passport = require('passport');



// Bring in User Model
let User = require('../models/user');
let Staff = require('../models/staff');
let Appuser = require('../models/appuser');
let Place = require('../models/place');
let Chat = require('../models/chat');
// Display list of all Authors.
exports.usercheck = function(req, res) {
    User.findOne({username: req.query.username}, function (err, user) {
        if (err) {
            console.log(err);
        }
        var message;
        if (user) {
            console.log(user)
            message = "user exists";
            console.log(message)
        } else {
            message = "user doesn't exist";
            console.log(message)
        }
        res.json({message: message});
    });
};

exports.loginredirect = function(req, res,next) {
    console.log(req.user.usertype);


    var numOfUsers;
    var numOfStaffs;
    var numOfAppUser;
    var numOfPlace;


    function numOfUsers() {
        User.count({}, function( err, count){
            numOfUsers=count;
            console.log( "Number of users:", count );
        });
    }


    function numofStaffs() {
        Staff.count({}, function( err, count){
            numOfStaffs=count;
            console.log( "Number of users:", count );
        });
    }

    function numOfAppUser () {
        Appuser.count({}, function( err, count){
            numOfAppUser=count;
            console.log( "Number of users:", count );
        });
    }

    function numOfPlace() {
        Place.count({}, function( err, count){
            numOfPlace=count;
            console.log( "Number of users:", count );
        });
    }


    numOfUsers();
    numofStaffs();
    numOfAppUser ();
    numOfPlace();

    if (req.user.usertype === "admin") {
        Chat.find({}, function (err, chats) {
            if (err) {
                console.log(err);
            } else {
                console.log("Number :"+numOfStaffs);

                res.render("admin/index", {
                    username: req.user.username,
                    chats: chats,
                    numOfUsers:numOfUsers,
                    numOfStaffs:numOfStaffs,
                    numOfAppUser:numOfAppUser,
                    numOfPlace:numOfPlace
                });
            }
        });
    } else if (req.user.usertype === "appuser") {
        res.render("appuser/index", {
            numOfAppUser:numOfAppUser,
            numOfPlace:numOfPlace,
            username: req.user.username
        });
    }
    else if (req.user.usertype === "staff") {
        res.render("staff/index", {
            username: req.user.username,
            numOfPlace:numOfPlace
        });
    }
};

exports.registerpost = function(req, res,next) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            usertype: "admin"
        });

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        console.log('success added to database');
                        req.flash('success', 'You are now registered and can log in');
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
};

exports.login = function(req, res) {
    res.render('login');
};

exports.register = function(req, res) {
    res.render('register');
};

exports.loginpost = function(req, res,next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

exports.logout = function(req, res,next) {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
};