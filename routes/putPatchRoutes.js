const express = require('express')
const router = express.Router()

const { loan_types_put } = require('../controllers/mainController')

router.put('/loan-types/:id', loan_types_put)

module.exports = router