const User = require('../models/User')
const LoanType = require('../models/LoanType')

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

module.exports.loan_types_post = async (req, res) => {
    const loanType = new LoanType({ type: req.body.type, description: req.body.description })

    try {
        await loanType.save()
        res.status(201).json('ok')
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