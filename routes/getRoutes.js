const express = require('express')
const router = express.Router()

const { index_get, signup_get, users_get, dashboard_get, loan_types_get, loan_plans_get, borrowers_get, payment_get, loans_get } = require('../controllers/mainController')
const { logout_get } = require('../controllers/authController')
const { requireAuth, checkLoginStatus } = require('../controllers/middleware')

router.get('/', checkLoginStatus, index_get)
router.get('/logout', logout_get)
router.get('/signup', checkLoginStatus, signup_get)
router.get('/users', requireAuth, users_get)
router.get('/dashboard', requireAuth, dashboard_get)
router.get('/loan-types', requireAuth, loan_types_get)
router.get('/loan-plans', requireAuth, loan_plans_get);
router.get('/borrowers', requireAuth, borrowers_get);
router.get('/payments', requireAuth, payment_get);
router.get('/loans', requireAuth, loans_get);
module.exports = router