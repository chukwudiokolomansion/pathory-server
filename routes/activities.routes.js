const router = require("express").Router();

const Activity = require("../models/Activity.model");
const { verifyToken } = require("../middlewares/auth.middlewares")


// Route: GET /activities

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const response = await Activity.find();
    console.log("Retrieved activities ->", response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error); 
    res.status(400).json(error);  
  }
});
//get one activity
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const response = await Activity.findById(req.params.id);

    if (!response) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// this is to create 
router.post("/", verifyToken, async (req, res) => {
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

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
   
  }
});

// this is to update 
router.patch("/:id", verifyToken, async (req, res) => {
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
      req.params.id,
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
     res.status(400).json(error);
   
  }
});

// this is to delete 
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const response = await Activity.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
    console.log("activity deleted");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;