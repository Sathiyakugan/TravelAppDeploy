const bcrypt = require('bcryptjs');
const passport = require('passport');



// Bring in User Model
let User = require('../models/user');
let Staff = require('../models/staff');
let Appuser = require('../models/appuser');
let Place = require('../models/place');
let Chat = require('../models/chat');
// Display list of all Authors.

exports.view = function(req, res,next) {
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
                res.render("admin/viewReport", {
                    username: req.user.username,
                    chats: chats,
                    numOfUsers:numOfUsers,
                    numOfStaffs:numOfStaffs,
                    numOfAppUser:numOfAppUser,
                    numOfPlace:numOfPlace
                });
            }
        });
    }
};