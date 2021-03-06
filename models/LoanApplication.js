const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loanApplicationSchema = new Schema({
    applicationDate: {
        type: Date,
        default: new Date()
    },
    member: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    loanType: {
        type: Schema.Types.ObjectId,
        ref: 'loan-type'
    },
    coMakers: {
        type: Number,
        default: 0
    },
    maxPaymentTerms: {
        type: Number,
        default: 0
    },
    processingFee: {
        type: Number,
        default: 0
    },
    loanAmount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "processing"
    },
    purpose: String
})

module.exports = mongoose.model('loan-application', loanApplicationSchema)