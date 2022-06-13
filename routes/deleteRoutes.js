const express = require('express')
const router = express.Router()

const { loan_types_delete, loan_plans_delete } = require('../controllers/mainController')

router.delete('/loan-types/:id', loan_types_delete)
router.delete('/loan-plans/:id', loan_plans_delete)

module.exports = router