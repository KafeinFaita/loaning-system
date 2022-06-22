const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dayjs = require('dayjs')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    photoPath: {
        type: String,
        default: "/images/default-photo.png"
    },
    fullname: {
        type: String,
        default: ""
    },
    membershipDate: {
        type: Date,
        default: dayjs().toDate()
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
    role: {
        type: String,
        default: 'member'
    },
    messages: [{
        from: String,
        body: String
    }],
    loan: [{
        type: Schema.Types.ObjectId,
        ref: 'loan-application'
    }]
})

module.exports = mongoose.model('user', userSchema)