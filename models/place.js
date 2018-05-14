const mongoose = require('mongoose');

// User Schema
const PlaceSchema = mongoose.Schema({
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    vicinity: {
        type: String,
        required: true
    },
    placetype: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Place = module.exports = mongoose.model('Place', PlaceSchema);
