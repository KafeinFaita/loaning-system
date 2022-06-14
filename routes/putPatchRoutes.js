const express = require('express')
const router = express.Router()

const { loan_types_put, loan_plans_put } = require('../controllers/mainController')

router.put('/loan-types/:id', loan_types_put)
router.put('/loan-plans/:id', loan_plans_put)

module.exports = router