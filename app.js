require("dotenv").config();

// Import models
const userModel = require("./models/User.model");
const contactModel = require("./models/Contact.model");
const categoryModel = require("./models/Note.model");

// Connects to the database
require("./db");

const express = require("express");
const cors = require("cors");

const app = express();

require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const contactRoutes = require("./routes/contact.routes");
app.use("/contact", contactRoutes);

const noteRoutes = require("./routes/notes.routes");
app.use("/notes", noteRoutes);

require("./error-handling")(app);

module.exports = app;
