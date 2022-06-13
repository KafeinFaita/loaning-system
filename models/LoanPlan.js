const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loanPlanSchema = new Schema({
    yearsMonths: {
        type: Number,
        required: true
    },
    interest: {
        type: Number,
        required: true
    },
    overduePenalty: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('loan-plan', loanPlanSchema)