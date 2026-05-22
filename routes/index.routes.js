const router = require("express").Router();

// ℹ️ Organize and connect all your route files here.
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const activityRoutes = require("./activities.routes")
router.use("/activities, activityRoutes")

const plannerRoutes = require("./planners.routes")
router.use("/planner, plannerRoutes")

module.exports = router;