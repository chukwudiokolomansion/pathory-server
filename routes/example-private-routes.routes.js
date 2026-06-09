const router = require("express").Router();

const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

//! A PRIVATE ROUTE 
router.get("/", verifyToken, (req, res) => {

  console.log(req.payload)

  
  User.findById(req.payload._id)
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((error) => {
    next(error)
  })
})

//!AN ADMIN
router.get("/admin", verifyToken, verifyAdmin, () => {
  res.send("SUPER ULTRA SECRET INFO ONLY FOR ADMINS")
})

module.exports = router;