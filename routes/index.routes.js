const router = require("express").Router();

// ℹ️ Organize and connect all your route files here.
router.get("/test", (req, res, next) => {
 try {
  res.json({ message: "all is good you are connecting to " });
} catch (err) {
    console.log(error);
  }
});

// ...

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

// ...
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const activityRoutes = require("./activities.routes");
router.use("/activities", activityRoutes);

const plannerRoutes = require("./planners.routes");
router.use("/planners", plannerRoutes);

module.exports = router;