const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const foodRoutes = require("./foodRoutes");
const activityRoutes = require("./activityRoutes");

// importing all routes here
router.use("/user", userRoutes);
router.use("/food", foodRoutes);
router.use("/activity", activityRoutes);

// export router
module.exports = router;
