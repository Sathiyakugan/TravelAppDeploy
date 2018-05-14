const bcrypt = require('bcryptjs');
const passport = require('passport');
var fs = require('fs');
var path = require('path');

// Bring in All Model
let Place = require('../models/place');

// Insert Places
exports.insert = function(req, res,next) {
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



    console.log('file info: ', req.file);
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const place = req.body.place;
    const vicinity = req.body.vicinity;
    const placetype = req.body.placetype;
    const country = req.body.country;
    // const picture = req.body.picture;
    const description = req.body.description;


    req.checkBody('latitude', 'Latitude is required').notEmpty();
    req.checkBody('longitude', 'Longitude is required').notEmpty();
    req.checkBody('vicinity', 'Vicinity is not valid').notEmpty();
    req.checkBody('placetype', 'placetype is required').notEmpty();
    req.checkBody('country', 'country is required').notEmpty();
    req.checkBody('description', 'description is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        res.render(user+'/addplaces', {
            errors: errors
        });
    } else {


        var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
            imgUrl = '';

        for (var i = 0; i < 6; i += 1) {
            imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        var tempPath = req.file.path, //<line 55 error
            ext = path.extname(req.file.originalname).toLowerCase(),
            targetPath = path.resolve('./public/upload/' + imgUrl + ext);

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {


            fs.rename(tempPath, targetPath, function (err) {
                if (err) throw err;
                console.log("Upload completed!");
            });
        } else {
            fs.unlink(tempPath, function () {
                if (err) throw err;

                res.json(500, {error: 'Only image files are allowed.'});
            });
        }


        let newPlace = new Place({
            latitude: latitude,
            longitude: longitude,
            place: place,
            vicinity: vicinity,
            placetype: placetype,
            country: country,
            picture: targetPath,
            description: description
        });

        newPlace.save(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log('success place added to database');
                req.flash('success', 'You have saved the place');
                res.redirect('/');
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
    else if(req.user.usertype === "appuser"){
        user="appuser"
    }
    else if(req.user.usertype === "staff"){
        user="staff"
    }
    res.render(user+'/addplaces', {title: 'Add Places'});
};

// View places json
exports.viewalljson = function(req, res,next) {
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


    // Home Route
    Place.find({}, function (err, places) {
        if (err) {
            console.log(err);
        } else {
            res.json(places);
        }
    });
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


    // Home Route
    Place.find({}, function (err, places) {
        if (err) {
            console.log(err);
        } else {
            res.render(user+'/viewplaces', {
                places: places
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
    Place.findById(req.params.id, function (err, place) {

        res.json(place)
        // res.render('admin/viewonestaff', {
        //     staff:staff
        // });
    });
};