const express = require("express");
const Output = require("../utils/Output");
const foodService = require("../service/foodService");

// get foods method
const getFoods = async (req, res) => {
  try {
    // calling service file
    let data = await foodService.getFoods();

    // returing success output, message, data
    return await Output.success(res, "Successfully get foods.", data);
  } catch (e) {
    // else error
    console.log(e, "from get foods controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  getFoods,
};
