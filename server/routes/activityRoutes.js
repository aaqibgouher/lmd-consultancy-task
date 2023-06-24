const express = require("express");
const router = express.Router();
const activityController = require("../controller/activityController");

// ACTIVITY ROUTES

// get activities
router.get("/", activityController.getActivities);

// exported router
module.exports = router;
