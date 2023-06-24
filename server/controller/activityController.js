const express = require("express");
const Output = require("../utils/Output");
const activityService = require("../service/activityService");

// get activities method
const getActivities = async (req, res) => {
  try {
    // calling service file to get activites
    let data = await activityService.getActivities();

    // returing success output, message, data
    return await Output.success(res, "Successfully get activities.", data);
  } catch (e) {
    // else error
    console.log(e, "from get activities controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  getActivities,
};
