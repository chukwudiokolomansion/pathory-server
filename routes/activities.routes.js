const router = require("express").Router();

const Activity = require("../models/Activity.model");


// Route: GET /activities

router.get("/", async (req, res) => {
  try {
    const response = await Activity.find();
    console.log("Retrieved activities ->", response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

// this is to create 
router.post("/", async (req, res) => {
  try {
    const newActivity = {
      title: req.body.title,
      aiDescription: req.body.aiDescription,
      activityType: req.body.activityType,
      location: req.body.location,
      image: req.body.image,
      video: req.body.video, 
      tag: req.body.tag,
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
router.patch("/:userId", async (req, res) => {
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
      req.params.userId,
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
router.delete("/:userId", async (req, res) => {
  try {
    const response = await Activity.findByIdAndDelete(req.params.userId);
    res.sendStatus(200);
    console.log("activity deleted");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;