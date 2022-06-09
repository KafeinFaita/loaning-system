const express = require('express')
const router = express.Router()

const { signup_post } = require('../controllers/authController')

router.post('/signup', signup_post)

module.exports = router