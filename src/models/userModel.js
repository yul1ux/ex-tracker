const mongoose = require('mongoose')

const {Schema} = mongoose;

const USER = new Schema({
    username: String,
})

module.exports = mongoose.model('userSchema',USER,'user')