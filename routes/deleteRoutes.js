const express = require('express')
const router = express.Router()

const { loan_types_delete } = require('../controllers/mainController')

router.delete('/loan-types/:id', loan_types_delete)

module.exports = router