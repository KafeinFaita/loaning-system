const express = require('express')
const router = express.Router()

const { index_get, signup_get, users_get, dashboard_get } = require('../controllers/mainController')
const { requireAuth, checkLoginStatus } = require('../controllers/middleware')

router.get('/', checkLoginStatus, index_get)
router.get('/signup', checkLoginStatus, signup_get)
router.get('/users', requireAuth, users_get)
router.get('/dashboard', requireAuth, dashboard_get)

module.exports = router