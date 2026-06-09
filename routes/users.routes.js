const express = require("express")
const router = express.Router()
const User = require("../models/User.model")
const { verifyToken} = require("../middlewares/auth.middlewares")
const bcrypt = require("bcryptjs")

//GET /api/users/profile 

router.get("/profile", verifyToken, async (req, res, next) => {
    try {
      
        const user = await User.findById(req.payload._id);
        console.log(user)
        res.status(200).json(user)

    } catch (error) {
        next(error)
    }
})

//PATCH /api/users/profile 

router.patch("/profile", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id);

    if (!user) {
      return res.status(404).json({
        errorMessage: "User not found.",
      });
    }

    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          errorMessage: "Password must be at least 6 characters",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/users/profile

router.delete("/profile", verifyToken, async (req, res, next) => {
  try {
   const user = await User.findById(req.payload._id);

    if (!user) {
      return res.status(404).json({
        errorMessage: "User not found.",
      });
    }

    await User.findByIdAndDelete(req.payload._id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router