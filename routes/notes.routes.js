const express = require("express");
const router = express.Router();
const noteModel = require("../models/Note.model");

//  Create
router.post("/add-note/:contactId", async (req, res) => {
  try {
    const newNote = await noteModel.create({
      content: req.body.content,
      contact: req.params.contactId,
      creator: req.body.creator, // You can later replace this with req.payload._id if using JWT
    });
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating note", error });
  }
});

// Get all
router.get("/:contactId", async (req, res) => {
  try {
    const notes = await noteModel
      .find({ contact: req.params.contactId })
      .populate("creator", "username")
      .sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching notes", error });
  }
});

// Delete
router.delete("/delete-note/:noteId", async (req, res) => {
  try {
    const deleted = await noteModel.findByIdAndDelete(req.params.noteId);
    res.status(200).json({ message: "Note deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
});

module.exports = router;
