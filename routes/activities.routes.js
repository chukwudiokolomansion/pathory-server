const router = require("express").Router();

const Activity = require("../models/Activity.model");


// Route: GET /activities

router.get("/", async (req, res, next) => {
  try {
    const response = await Activity.find();
    console.log("Retrieved activities ->", response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
});

// this is to create 
router.post("/", async (req, res) => {
  try {

    const newActivity = {
      userId: req.body.userId,
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

    res.status(201).json(response);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
});

// this is to update 
router.patch("/:activityId", async (req, res) => {
  try {

    const updatedActivity = {
      userId: req.body.userId,
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
      {
        new: true,
        runValidators: true
      }
    );

    console.log("activity updated");

    res.status(200).json(response);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
});

// this is to delete 
router.delete("/:activityId", async (req, res) => {
  try {
    const response = await Activity.findByIdAndDelete(req.params.activityId);
    res.sendStatus(200);
    console.log("activity deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

module.exports = router;