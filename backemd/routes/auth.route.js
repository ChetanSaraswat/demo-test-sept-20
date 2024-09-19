const express = require('express')
const { authController } = require('../controllers');
const authenticateJWT = require('../middleware/jwt.middleware');
const router = express.Router();

router.post('/sign-up', authController.signUpUser);
router.post('/sign-in', authController.signInUser);
router.get('/userData',authenticateJWT, authController.getUserData);

module.exports = router;