const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loanTypeSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    maxAmount: {
        type: Number
       
    },
    interestRate: {
        type: Number
    }
})

module.exports = mongoose.model('loan-type', loanTypeSchema)