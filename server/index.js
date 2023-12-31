const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// db configuration
require("./database/config");

// models
const UserModel = require("./models/UserModel");
const ActivityModel = require("./models/ActivityModel");
const FoodModel = require("./models/FoodModel");

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// imported routes
const router = require("./routes");

// my routes
app.use("/api/", router);

// port
const PORT = process.env.PORT || 3000;

// listening port
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
