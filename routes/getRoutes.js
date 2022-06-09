const express = require('express')
const router = express.Router()

const { users_get } = require('../controllers/mainController')

router.get('/users', users_get)

module.exports = router