const userModel = require("../models/User.model");

const router = require("express").Router();

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.middleware");
// sign up

router.post("/signup", async (req, res) => {
  const regex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

  if (!regex.test(req.body.password)) {
    return res.status(403).json({
      errorMessage: "Password too weak",
    });
  }

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
      //finding user by just their ID alone
      const foundUser = await userModel
        .findById(createdUser._id)
        .select("username");

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
      const doesPasswordMatch = bcryptjs.compareSync(
        req.body.password,
        foundUser.password
      );
      if (doesPasswordMatch) {
        const theDataInToken = { _id: foundUser._id };
        const authToken = jwt.sign(theDataInToken, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6D",
        });

        res
          .status(200)
          .json({ message: "Welcome back!", authToken: authToken });
      } else {
        res.status(403).json({ errorMessage: "Invalid Credentials" });
      }
      console.log("does password match", doesPasswordMatch);
    }
  } catch (error) {
    console.log(error);
  }
});

// verify that checks authToken with middleware
router.get("/verify", isAuthenticated, async (req, res) => {
  res
    .status(200)
    .json({ message: "Token verified!", currentUser: req.payload });
});

router.get("/profile/:userId", async (req, res) => {
  try {
    const userDataInDB = await userModel.findById(req.params.userId);
    res.status(200).json(userDataInDB);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
