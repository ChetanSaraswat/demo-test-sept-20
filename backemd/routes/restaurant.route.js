const express = require('express')
const authenticateJWT = require('../middleware/jwt.middleware');
const { restaurantController } = require('../controllers');
const router = express.Router();

router.post('/createRestaurant', authenticateJWT , restaurantController.CreateRestaurant);
router.get('/allRestaurant',authenticateJWT, restaurantController.getAllRestaurant);
router.get('/specific',authenticateJWT, restaurantController.getspecificRestaurant);

module.exports = router;  