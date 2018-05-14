const mongoose = require('mongoose');

// User Schema
const DeletedUserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        validate: {
            validator: function (v, cb) {
                User.find({name: v}, function (err, docs) {
                    cb(docs.length == 0);
                });
            },
            message: 'User already exists!'
        },
        required: true
    },
    usertype: {
        type: String,
        required: true
    }
});

const DeletedUser = module.exports = mongoose.model('DeletedUser', DeletedUserSchema);
