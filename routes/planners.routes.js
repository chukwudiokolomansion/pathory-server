const router = require("express").Router();

const Planner = require("../models/Planner.model");



// Route: GET /planners

router.get("/", async (req, res, next) => {
  try {
    const response = await Planner.find();
    console.log("Retrieved planners ->", response);
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

    const newPlanner = {
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reminders: req.body.reminders,
      destination: req.body.destination,
      status: req.body.stuats,
    };

    const response = await Planner.create(newPlanner);

    console.log("new planner created");

    res.status(200).json(response);

  } catch (error) {

    console.log(error);
res.status(500).json({
  message: error.message
    });
  }
});

// this is to update 
router.patch("/:plannerId", async (req, res) => {
  try {

    const updatedPlanner = {
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reminders: req.body.reminders,
      destination: req.body.destination,
      status: req.body.status,
    };

    const response = await Planner.findByIdAndUpdate(
      req.params.plannerId,
      updatedPlanner,
      { new: true, runValidators: true }
    );

    console.log("planner updated");

    res.status(200).json(response);

  } catch (error) {

    console.log(error); 
    res.status(500).json({
      message: error.message
    });  
  }
});
   
// this is to delete 
router.delete("/:plannerId", async (req, res) => {
  try {
    const response = await Planner.findByIdAndDelete(req.params.plannerId);
    res.sendStatus(200);
    console.log("planner deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;