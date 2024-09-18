const express = require('express')
const { authController } = require('../controllers')
const router = express.Router();

router.post('/sign-up', authController.signUpUser);
router.post('/sign-in', authController.signInUser);

module.exports = router;