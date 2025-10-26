require("dotenv").config();

// Import models
const userModel = require("./models/User.model");
const contactModel = require("./models/Contact.model");
const categoryModel = require("./models/Category.model");

// Connects to the database
require("./db");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(express.json());

require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const contactRoutes = require("./routes/contact.routes");
app.use("/contact", contactRoutes);

const categoryRoutes = require("./routes/category.routes");
app.use("/category", categoryRoutes);

require("./error-handling")(app);

module.exports = app;
