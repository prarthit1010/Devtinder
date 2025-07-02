const express = require('express');
const { adminauth } = require('./middleware/auth');

const connectDB = require("./config/database")

const User = require("./Model/user")

const app = express();


app.post("/signup", async (err,req,res)=>{

    const user = new User({
        firstName : "Prarthit",
        lastName : "Patel",
        emailId :"prarthit12@gmail.com",
        mobileNumber : 12355445885
    })


    try{

        
    await user.save();

    res.send("data saved sucessfully")

    }
    catch(err){

        res.status(400).send("BAd request" + err.message);
    }

})



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


