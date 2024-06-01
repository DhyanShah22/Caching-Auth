const express = require('express')
const router = express.Router()
const {
    signupUser,
    loginUser,
} = require('../Controllers/userControllers')

router.post('/login', loginUser)

router.post('/signup', signupUser)

module.exports = router