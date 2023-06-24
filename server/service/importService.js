const express = require("express");
const XLSX = require("xlsx");
const path = require("path");
const FoodModel = require("../models/FoodModel");
const ActivityModel = require("../models/ActivityModel");
const { default: mongoose } = require("mongoose");
require("../database/config.js");

// get json data by file name
const getJsonData = async (fileName) => {
  try {
    // Read the .xlsx file
    const workbook = XLSX.readFile(path.join(__dirname, "..", fileName));
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // returning json data
    return jsonData;
  } catch (e) {
    // else error
    console.log("from get json data method");
  }
};

// get modified food data
// modifies the  column name
const getModifiedFoodData = async (data) => {
  try {
    // looping over, and creating custom array of objects with required keys
    let modifiedData = data.map((row) => ({
      name: row.name && row.name.trim() ? row.name : "",
      foodGroup:
        row["Food Group"] && row["Food Group"].trim() ? row["Food Group"] : "",
      calories: row["Calories"] ? row["Calories"] : 0,
      fat: row["Fat (g)"] ? row["Fat (g)"] : 0.0,
      protein: row["Protein (g)"] ? row["Protein (g)"] : 0.0,
      carbohydrates: row["Carbohydrate (g)"] ? row["Carbohydrate (g)"] : 0.0,
      servingDescription:
        row["Serving Description 1 (g)"] &&
        row["Serving Description 1 (g)"].trim()
          ? row["Serving Description 1 (g)"]
          : "",
    }));

    // returnig data
    return modifiedData;
  } catch (e) {
    // else error
    console.log("from get modified food data method");
  }
};

// modified data for activity
// modifies column name
const getModifiedActivityData = async (data) => {
  try {
    // looping over, and creating custom data format
    let modifiedData = data.map((row) => ({
      activity:
        row["ACTIVITY"] && row["ACTIVITY"].trim() ? row["ACTIVITY"] : "",
      specificMotion:
        row["SPECIFIC MOTION"] && row["SPECIFIC MOTION"].trim()
          ? row["SPECIFIC MOTION"]
          : "",
      metValue: row["METs"] ? row["METs"] : 0.0,
    }));

    // returnig data
    return modifiedData;
  } catch (e) {
    // else error
    console.log("from get modified activity data method");
  }
};

// import data main function
const importData = async () => {
  try {
    // For food and activities
    // Read the .xlsx file
    // pass the file path
    const foodJsonData = await getJsonData("food_calories.xlsx");
    const activityJsonData = await getJsonData("activities.xlsx");

    // Modify column names and prepare data for bulk insert
    const modifiedFoodData = await getModifiedFoodData(foodJsonData);
    const modifiedActivityData = await getModifiedActivityData(
      activityJsonData
    );

    // if food and activity is true
    if (
      !modifiedFoodData ||
      !Array.isArray(modifiedFoodData) ||
      modifiedFoodData.length === 0
    ) {
      throw "No food data available to insert";
    }

    // if no acitvities in the file
    if (
      !modifiedActivityData ||
      !Array.isArray(modifiedActivityData) ||
      modifiedActivityData.length === 0
    ) {
      throw "No activity data available to insert";
    }

    // deleting the food and activity data first
    await FoodModel.deleteMany({}, { wtimeout: 0 });
    console.log("Food data deleted.");
    await ActivityModel.deleteMany({}, { wtimeout: 0 });
    console.log("Activity data deleted.");

    // Inserting modified food data
    const foodResult = await FoodModel.insertMany(modifiedFoodData);
    console.log(`${foodResult.length} food documents inserted successfully`);

    // Inserting modified activity data
    const activityResult = await ActivityModel.insertMany(modifiedActivityData);
    console.log(
      `${activityResult.length} activity documents inserted successfully`
    );

    // done
    console.log("Data inserted ...");
  } catch (e) {
    // else error
    console.log(e, "error from insert");
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

// calling this function
importData();

module.exports = {
  importData,
  getJsonData,
  getModifiedFoodData,
  getModifiedActivityData,
};
