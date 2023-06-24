const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// USER ROUTES

// get users
router.get("/", userController.getUsers);

// add user
router.post("/add", userController.addUser);

// get usr by id
router.get("/:id", userController.getUserById);

// add user calorie In by id
router.post("/:id/calorie-in", userController.addCaloryInForUserById);

// add user calorie Out by id
router.post("/:id/calorie-out", userController.addCaloryOutForUserById);

// delete user by id
router.delete("/:id", userController.deleteUserById);

// exported router
module.exports = router;
