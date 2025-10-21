const router = require("express").Router();

// sign up

router.post("/signup", (req, res) => {
  console.log("Sucessful");

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
