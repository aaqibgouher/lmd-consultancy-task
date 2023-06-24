const express = require("express");
const router = express.Router();
const foodController = require("../controller/foodController");

// FOOD ROUTES
// get foods
router.get("/", foodController.getFoods);

// exported router
module.exports = router;
