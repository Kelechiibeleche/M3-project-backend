const contactModel = require("../models/Contact.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware.js");
const router = require("express").Router();

// CRUD
//read all

router.get("/all-contacts/:userId", async (req, res, next) => {
  try {
    const allContactsInDB = await contactModel
      .find({ creator: req.params.userId })
      .populate("creator", "username_id");
    console.log(allContactsInDB);
    res.status(200).json(allContactsInDB);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//read one

router.get("/single-contact/:contactId", async (req, res) => {
  try {
    const oneContact = await contactModel.findById(req.params.contactId);
    console.log(req.params.contactId, oneContact);
    res.status(200).json(oneContact);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//create

router.post("/create-a-contact", async (req, res) => {
  console.log(req.body);
  try {
    const createdContact = await contactModel.create(req.body);
    console.log("contact created successfully", createdContact);
    res.status(201).json(createdContact);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//update

router.put("/update-a-contact/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contactModel.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// delete

router.delete("/delete-a-contact/:contactId", async (req, res) => {
  try {
    const deletedContact = await contactModel.findByIdAndDelete(
      req.params.contactId
    );
    res.status(200).json({ message: "Contact Deleted", deletedContact });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
