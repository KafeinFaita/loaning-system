const User = require('../models/User')
const LoanType = require('../models/LoanType')
const LoanPlan = require('../models/LoanPlan')
const LoanApplication = require('../models/LoanApplication')

const dayjs = require('dayjs')
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
        const page = req.query.page - 1

        const users = await User.find().skip(page * 5).limit(5)
        const userCount = await User.find().countDocuments({})
        const names = users.map(user => user.username)
       
        res.render('users', { names, pages: Math.ceil(userCount/5), currentPage: req.query.page || 1 })
    } catch (error) {
        console.log(error)
    }
}

module.exports.profile_get = async (req, res) => {

    const decodedToken = decode(req.cookies.jwt)

    try {
        const { password, __v0, membershipDate, loan, ...data } = await User.findById(decodedToken.id).populate('loan').lean()
        console.log(loan)
        const date = dayjs(membershipDate).format('MMM D, YYYY')
        res.render('profile', { user: data, membershipDate: date })
    } catch (error) {
        console.log(error)
    }
}

module.exports.dashboard_get = (req, res) => {
    res.render('dashboard')
}

module.exports.loan_types_get = async (req, res) => {

    try {
        const page = req.query.page - 1

        const loanTypes = await LoanType.find().skip(page * 5).limit(5)
        const loanTypesCount = await LoanType.find().countDocuments({})
        res.render('loan-types', { loanTypes, pages: Math.ceil(loanTypesCount/5), currentPage: req.query.page || 1 })
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

module.exports.loan_members_get = async (req, res) => {
    const userToken = decode(req.cookies.jwt)
    try {
        const page = req.query.page - 1

        const loanTypes = await LoanType.find()

        const user = await User.findOne({ _id: userToken.id }, { loan: {$slice:[(page * 5), 5]} }).populate({
            path: 'loan',
            populate: {
                path: 'loanType'
            }
        })
        const loanCount = await User.findById(userToken.id)

        console.log(user)
   
        const memberYears = dayjs(new Date()).diff(user.membershipDate, 'year')

        res.render('loan-members', { name: user.fullname, types: loanTypes, memberLoans: user.loan, memberYears, pages: Math.ceil(loanCount.loan.length / 5), currentPage: req.query.page || 1 });
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

    const userToken = decode(req.cookies.jwt)

    try {
        const page = req.query.page - 1

        // const user = await User.findById(userToken.id)
        // const loanTypes = await LoanType.find()
        const loanApplications = await LoanApplication.find().populate('member loanType').skip(page * 5).limit(5)
        const loanApplicationsCount = await LoanApplication.find().countDocuments({})
        // const memberYears = dayjs(new Date()).diff(user.membershipDate, 'year')

        res.render('loans', { loanApplications, pages: Math.ceil(loanApplicationsCount / 5), currentPage: req.query.page || 1 });
    } catch (error) {
        console.log(error)
    }
   
}

module.exports.loan_application_get = async (req, res) => {
    res.render('loan-application')
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

module.exports.loan_application_post = async (req, res) => {
    const userToken = decode(req.cookies.jwt)

    try {
        const user = await User.findById(userToken.id)
        const loanApplication = new LoanApplication({ 
            applicationDate: dayjs().toDate(),
            member: user._id,
            loanType: req.body.loanType,
            coMakers: req.body.coMakers,
            maxPaymentTerms: req.body.maxPaymentTerms,
            loanAmount: req.body.loanAmount,
            purpose: req.body.purpose
         })
         user.loan.push(loanApplication._id)

         await user.save()
         await loanApplication.save()

         res.json('ok')
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

module.exports.loans_patch = async (req, res) => {
    try {
        const loan = await LoanApplication.findById(req.params.id)
        loan.status = req.body.status
        await loan.save()
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