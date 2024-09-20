const express = require("express");
const router = express.Router();
router.use("/auth", require("./auth.route"));
router.use("/restaurant", require("./restaurant.route"));
router.use("/menu", require("./menu.route"));
module.exports = router
