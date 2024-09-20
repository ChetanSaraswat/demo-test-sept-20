const express = require('express')
const authenticateJWT = require('../middleware/jwt.middleware');
const { restaurantController, menuController } = require('../controllers');
const router = express.Router();

router.post('/createMenu', authenticateJWT , menuController.CreateMenu);
router.get('/allMenu',authenticateJWT, menuController.getAllMenu);
router.get('/specific',authenticateJWT, restaurantController.getspecificRestaurant);

module.exports = router;  