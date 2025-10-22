const userModel = require("../models/User.model");

const router = require("express").Router();

const bcryptjs = require("bcryptjs");
// sign up

router.post("/signup", async (req, res) => {
  try {
    //if email exists in DB
    const foundUserWithEmail = await userModel.findOne({
      email: req.body.email,
    });

    if (foundUserWithEmail) {
      res.status(403).json({
        errorMessage: "Invalid Credentials",
      });
    } else {
      // salt
      const theSalt = bcryptjs.genSaltSync(12);
      const hashedPassword = bcryptjs.hashSync(req.body.password, theSalt);
      console.log("Salt successful", theSalt);
      console.log("Hashed password successful", hashedPassword);
      //user with encrypted passsword

      const createdUser = await userModel.create({
        ...req.body,
        password: hashedPassword,
      });
      //finding user by just their user name alone
      const foundUser = await userModel
        .findById(createdUser._id)
        .select("name");

      res.status(201).json(foundUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const foundUser = await userModel.findOne({ email: req.body.email });
    if (!foundUser) {
      res.status(403).json({ errorMessage: "Invalid Credentials" });
    } else {
      console.log(foundUser);

      res.status(200).json({ message: "Welcome back!" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
