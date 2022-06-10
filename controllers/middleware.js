const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'loaning secret', (err, decodedToken) => {
            if (err) {
                return res.redirect('/')
            }
            return next()
        })
    } else {
        return res.redirect('/')
    }
}

// for login and logout redirect when user is logged in
const checkLoginStatus = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'loaning secret', (err, decodedToken) => {
            if (err) {
                return next()
            }
            return res.redirect('/dashboard')
        })
    } else {
        return next()
    }
}

module.exports = { requireAuth, checkLoginStatus }