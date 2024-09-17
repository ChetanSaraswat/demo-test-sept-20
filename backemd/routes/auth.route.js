const express = require('express')
const { authController } = require('../controllers')
const router = express.Router();

router.post('/sign-in', authController.signInUser);
router.post('/sign-up', authController.signUpUser);

module.exports = router;