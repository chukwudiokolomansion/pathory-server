const router = require("express").Router();

//  all your route files
router.get("/test", (req, res, next) => {
 try {
  res.json({ message: "all is good you are connecting to " });
} catch (err) {
    console.log(error);
  }
});


const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

// ...
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const userRoutes = require("./users.routes");
router.use("/users", userRoutes);

const privateExampleRoutes = require("./example-private-routes.routes")
router.use("/private-example", privateExampleRoutes)

const plannerRoutes = require("./planners.routes");
router.use("/planners", plannerRoutes);

const activityRoutes = require("./activities.routes");
router.use("/activities", activityRoutes);

module.exports = router;