const express = require('express')
const router = express.Router()

const { signup_post, login_post } = require('../controllers/authController')

router.post('/signup', signup_post)
router.post('/', login_post)

module.exports = router