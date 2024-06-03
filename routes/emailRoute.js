const express = require('express')
const emailController = require('../controllers/emailCon')
const router = express.Router()


router.post('/send-email', emailController);

module.exports = router;