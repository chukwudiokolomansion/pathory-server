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
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const planner = await Planner.findById(req.params.id);

    if (!planner) {
      return res.status(404).json({
        message: "Planner not found",
      });
    }

    if (planner.user.toString() !== req.payload._id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedPlanner = await Planner.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(updatedPlanner);
  } catch (error) {
    console.error(error);
  }
});
// GET ONE PLANNER
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const response = await Planner.findById(req.params.id);

    if (!response) {
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
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const response = await Planner.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
    console.log("planner deleted");
  } catch (error) {
    console.log(error);
  }
  
});

module.exports = router;