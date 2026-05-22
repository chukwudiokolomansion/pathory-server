const router = require("express").Router();

const Planner = require("../models/Planner.model");



// Route: GET /planners

router.get("/planners", async (req, res) => {
  try {
    const response = await Activity.find();
    console.log("Retrieved activities ->", response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

// this is to create
router.post("/planners", async (req, res) => {
  try {
    const newPlanner = {
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reminder: req.body.reminder,
      destination: req.body.destination,
      status: req.body.status,
      
    };
    const response = await Planner.create(newPlanner);
    res.status(200).json(response);
    console.log("new planner created");
  } catch (error) {
    console.log(error);
  }
});

// this is to update 
router.patch("/planners/:plannerId", async (req, res) => {
  try {
    const updatedPlanner = {
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reminder: req.body.reminder,
      destination: req.body.destination,
      status: req.body.status,
    };
    const response = await Planner.findByIdAndUpdate(
      req.params.plannerId,
      updatedPlanner,
      { new: true },
    );
    res.status(200).json(response);
    console.log("new planner updated");
  } catch (error) {
    console.log(error);
  }
});

// this is to delete 
router.delete("/planners/:plannerId", async (req, res) => {
  try {
    const response = await Planner.findByIdAndDelete(req.params.plannerId);
    res.sendStatus(200);
    console.log("planner deleted");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;