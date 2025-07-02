const express = require('express');
const { adminauth } = require('./middleware/auth');

const connectDB = require("./config/database")

const app = express();



connectDB()
  .then(() => {
    console.log("Database is connected successfully");

    app.listen(4000, () => {
      console.log("Server is running on port number 4000...");
    });
  })
  .catch((err) => {
    console.log("Error is there:", err);
  });

