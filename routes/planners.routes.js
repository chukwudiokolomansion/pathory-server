const router = require("express").Router();

const Planner = require("../models/Planner.model");
const { verifyToken } = require("../middlewares/auth.middlewares")



// Route: GET /planners

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const response = await Planner.find();
    console.log("Retrieved planners ->", response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

// this is to create.../api/planners

router.post("/", verifyToken, async (req, res) => {
  try {
    const planner = await Planner.create({
      user: req.payload._id,
      activity: req.body.activity,
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reminders: req.body.reminders || [],
      destination: req.body.destination,
      status: req.body.status || "pending",
    });

    res.status(201).json(planner);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message,
    });
  }
});

// this is to update 
router.patch("/:plannerId", verifyToken, async (req, res) => {
  try {

    const updatedPlanner = {  
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
     
  }
});
// GET ONE PLANNER
router.get("/:plannerId", verifyToken, async (req, res) => {
  try {
    const response = await Planner.findById(req.params.plannerId);

    if (!planner) {
      return res.status(404).json({
        message: "Planner not found",
      });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});
   
// this is to delete 
router.delete("/:plannerId", verifyToken, async (req, res) => {
  try {
    const response = await Planner.findByIdAndDelete(req.params.plannerId);
    res.sendStatus(200);
    console.log("planner deleted");
  } catch (error) {
    console.log(error);
  }
  
});

module.exports = router;