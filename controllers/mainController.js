const User = require('../models/User')
const LoanType = require('../models/LoanType')
const LoanPlan = require('../models/LoanPlan')
const decode = require('jwt-decode')
const fs = require('fs')

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

module.exports.profile_get = async (req, res) => {

    const decodedToken = decode(req.cookies.jwt)

    try {
        const { password, __v0, ...data } = await User.findById(decodedToken.id).lean()
        res.render('profile', { user: data })
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
    try {
        const loanPlans = await LoanPlan.find()
        res.render('loan-plans', { loanPlans })
    } catch (error) {
        console.log(error)
    }
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
    const loanType = new LoanType({ type: req.body.type, description: req.body.description, maxAmount: req.body.maxAmount, interestRate: req.body.interestRate })

    try {
        await loanType.save()
        res.status(201).json('ok')
    } catch (error) {
        console.log(error)
    }
}

module.exports.loan_plans_post = async (req, res) => {
    const loanPlan = new LoanPlan({ yearsMonths: req.body.plan, interest: req.body.interest, overduePenalty: req.body.penalty })

    try {
        await loanPlan.save()
        res.status(201).json('ok')
    } catch (error) {
        console.log(error)
    }
}


//PUT PATCH

module.exports.profile_patch = async (req, res) => {

    const decodedToken = decode(req.cookies.jwt)

    try {
        await User.findByIdAndUpdate(decodedToken.id, {
            fullname: req.body.fullname,
            address: req.body.address,
            email: req.body.email,
            contact: req.body.contact
        })
        res.json('ok')
    } catch (error) {
        res.json(error)
    }
}

module.exports.profile_photo_patch = async (req, res) => {
    console.log(req.file.path.substring(6))

    const decodedToken = decode(req.cookies.jwt)
    try {
        
        const user = await User.findById(decodedToken.id)
        console.log(user.fullname)

        if (fs.existsSync(`public${user.photoPath}`) && user.photoPath !== '/images/default-photo.png') {

                fs.unlink(`public${user.photoPath}`, err => {
                if (err) console.log(err)
            })
        }
       
        user.photoPath = req.file.path.substring(6)
        await user.save()
        res.json('ok')
    } catch (error) {
        console.log(error)
    }
    
}

module.exports.loan_types_put = async (req, res) => {
    try {
        // await LoanType.findByIdAndUpdate(req.params.id, {
        //     type: req.body.type,
        //     description: req.body.description
        // })

        const loanType = await LoanType.findById(req.params.id)
        loanType.type = req.body.type
        loanType.description = req.body.description
        loanType.maxAmount = req.body.maxAmount
        loanType.interestRate = req.body.interestRate
        await loanType.save()
        res.json('ok')
    } catch (error) {
        console.log(error)
    }
}

module.exports.loan_plans_put = async (req, res) => {
    try {
        await LoanPlan.findByIdAndUpdate(req.params.id, {
            yearsMonths: req.body.plan,
            interest: req.body.interest,
            overduePenalty: req.body.penalty
        })
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

module.exports.loan_plans_delete = async (req, res) => {
    
    try {
        await LoanPlan.findByIdAndDelete(req.params.id)
        res.json('ok')
    } catch (error) {
        console.log(error)
    }
}