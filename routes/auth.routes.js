const router = require("express").Router();
const User = require("../models/User.model");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res, next) => {
  // email, username, password
  console.log(req.body);
  const { email, username, password } = req.body;

  // both email and password are mandatory
  if (!email || !password) {
    res
      .status(400)
      .json({ errorMessage: "Both email and password are mandatory" });
    return; 
  }

  // password strong enough
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "Please enter a strong password with at least 8 characters, one uppercase, one lowercase and one number. ",
    });
    return; 
  }

  try {
    // email should be unique
    const foundUser = await User.findOne({ email: email }); 
    if (foundUser) {
      res
        .status(400)
        .json({ errorMessage: "user exists, please login instead" });
      return; 
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 12);

    //creating user
    const newUser = {
      email: email,
      username: username,
      password: hashedPassword,
    };

    const response = await User.create(newUser);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// POST "/api/auth/login" authenticate user
router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  //  both credentials are mandatory
  if (!email || !password) {
    res
      .status(400)
      .json({ errorMessage: "Both email and password are mandatory" });
    return; 

  }

  try {
    // the email in the DB should match
    const foundUser = await User.findOne({ email: email }); 
    console.log(foundUser);
    if (!foundUser) {
      res.status(400).json({
        errorMessage: "user not found with that email, please signup first",
      });
      return; 
    }

    // the password should match
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordMatch) {
      res.status(400).json({ errorMessage: "the password is not correct" });
      return; 
    }

    // user authentication and creation of token

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      // if you want to add  roles
    };

    const tokenConfig = {
      expiresIn: "7d",
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, tokenConfig);

    res.status(200).json({ authToken, payload });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
