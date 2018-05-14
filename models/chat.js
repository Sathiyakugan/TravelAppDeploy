const mongoose = require('mongoose');

// User Schema
const chatSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const Chat = module.exports = mongoose.model('Chat', chatSchema);
