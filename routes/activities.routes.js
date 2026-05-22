const router = require("express").Router();

const Activity = require("../models/Activity.model");


// Route: GET /activities

router.get("/activities", async (req, res) => {
  try {
    const response = await Activity.find();
    console.log("Retrieved activities ->", response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

// this is to create 
router.post("/activities", async (req, res) => {
  try {
    const newActivity = {
      title: req.body.title,
      aiDescription: req.body.aiDescription,
      activityType: req.body.activityType,
      location: req.body.location,
      image: req.body.image,
      video: req.body.video, 
      tags: req.body.tags,
      weather: req.body.weather,
    };
    const response = await Activity.create(newActivity);
    res.status(200).json(response);
    console.log("new activity created");
  } catch (error) {
    console.log(error);
  }
});

// this is to update 
router.patch("/activities/:activityId", async (req, res) => {
  try {
    const updatedActivity = {
      title: req.body.title,
      aiDescription: req.body.aiDescription,
      activityType: req.body.activityType,
      location: req.body.location,
      image: req.body.image,
      video: req.body.video, 
      tags: req.body.tags,
      weather: req.body.weather,
    };
    const response = await Activity.findByIdAndUpdate(
      req.params.activityId,
      updatedActivity,
      { new: true },
    );
    res.status(200).json(response);
    console.log("new activity updated");
  } catch (error) {
    console.log(error);
  }
});

// this is to delete 
router.delete("/activities/:activityId", async (req, res) => {
  try {
    const response = await Activity.findByIdAndDelete(req.params.activityId);
    res.sendStatus(200);
    console.log("activity deleted");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;