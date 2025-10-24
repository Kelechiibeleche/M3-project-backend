// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

//importing models
const userModel = require("./models/User.model");
const contactModel = require("./models/Contact.model");
const categoryModel = require("./models/Category.model");
// ℹ️ Connects to the database
require("./db");

// routes

/*app.get("/contacts", (req, res) => {
  contactModel.find().then((contacts) => {
    console.log("List of all contacts", contacts);
    res.status(200).json(pets);

  });

  .catch((err) => {
    console.log(err);
res.status(500).json({ errorMessage: "Problem finding your contacts", err });
  });
}); */

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const contactRoutes = require("./routes/contact.routes");
app.use("/contact", contactRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
