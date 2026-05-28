const router = require("express").Router();

const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

//! EXAMPLE OF HOW A PRIVATE ROUTE MIGHT LOOK LIKE
router.get("/", verifyToken, (req, res) => {

  console.log(req.payload)

  // imagine this route is for getting the details of user profile
  // User.findById(req.payload._id)

  // imagine that this route is for creating a document
  // Document.create({ ... some info, owner: req.payload._id})

  // imagine that this route is for deleting a document (only for the owner)
  // Document.findById(documentId)
  // conditional: document.owner == req.payload._id (only then, delete the document)

  // res.send("sending super secret information")

  //* imagine that this is a route for getting the PROFILE info of a user
  User.findById(req.payload._id)
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((error) => {
    next(error)
  })
})

//! EXAMPLE OF HOW AN ADMIN ONLY ROUTE MIGHT LOOK LIKE
router.get("/admin", verifyToken, verifyAdmin, () => {
  res.send("SUPER ULTRA SECRET INFO ONLY FOR ADMINS")
})

module.exports = router;