const User = require('../models/User')
const LoanType = require('../models/LoanType')
const { findByIdAndDelete } = require('../models/User')

module.exports.index_get = (req, res) => {
    res.render('index')
}

module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.users_get = async (req, res) => {
    try {
        const users = await User.find()
        const names = users.map(user => user.username)
       
        res.render('users', { names, test: "asd" })
    } catch (error) {
        console.log(error)
    }
}

module.exports.dashboard_get = (req, res) => {
    res.render('dashboard')
}

module.exports.loan_types_get = async (req, res) => {

    try {
        const loanTypes = await LoanType.find()
        res.render('loan-types', { loanTypes })
    } catch (error) {
        console.log(error)
    }
}

module.exports.loan_plans_get = async (req, res) => {
    res.render('loan-plans');
}

module.exports.borrowers_get = async (req,res) => {
    res.render('borrowers')
}

module.exports.payment_get = async(req,res) => {
    res.render('payment');
}

module.exports.loans_get = async(req,res) => {
    res.render('loans');
}


//POST

module.exports.loan_types_post = async (req, res) => {
    const loanType = new LoanType({ type: req.body.type, description: req.body.description })

    try {
        await loanType.save()
        res.status(201).json('ok')
    } catch (error) {
        console.log(error)
    }
}


//PUT PATCH

module.exports.loan_types_put = async (req, res) => {
    try {
        console.log(req.body)
        res.json('ok')
    } catch (error) {
        console.log(error)
    }
}


//DELETE

module.exports.loan_types_delete = async (req, res) => {
    
    try {
        await LoanType.findByIdAndDelete(req.params.id)
        res.json('ok')
    } catch (error) {
        console.log(error)
    }
}