const express = require('express')
const router = express.Router()

const { signup_post, login_post } = require('../controllers/authController')
const { loan_types_post } = require('../controllers/mainController')

router.post('/signup', signup_post)
router.post('/', login_post)
router.post('/loan-types', loan_types_post)

module.exports = router