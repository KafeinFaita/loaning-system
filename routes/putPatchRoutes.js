const express = require('express')
const router = express.Router()

const { loan_types_put, loan_plans_put, profile_patch, profile_photo_patch } = require('../controllers/mainController')
const { upload } = require('../controllers/middleware')

router.put('/loan-types/:id', loan_types_put)
router.put('/loan-plans/:id', loan_plans_put)
router.patch('/profile', profile_patch)
router.patch('/profile/photo', upload.single('profile_photo'), profile_photo_patch)

module.exports = router