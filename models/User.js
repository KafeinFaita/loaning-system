const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photoPath: {
        type: String,
        default: "/images/default-photo.png"
    },
    fullname: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    contact: {
        type: Number, 
        default: 0
    },
    messages: [{
        from: String,
        body: String
    }]
})

module.exports = mongoose.model('user', userSchema)