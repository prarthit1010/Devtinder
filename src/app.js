const express = require('express');
const connectDB = require("./config/database");
const User = require("./Model/user");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).send("Data saved successfully");
  } catch (err) {
    console.error("Error while saving user:", err.message);
    res.status(500).send("Failed to save user data");
  }
});

// Start server after DB connection
connectDB()
  .then(() => {
    console.log("Database is connected successfully");

    app.listen(4000, () => {
      console.log("Server is running on port number 4000...");
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
