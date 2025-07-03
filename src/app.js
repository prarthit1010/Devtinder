const express = require('express');
const { adminauth } = require('./middleware/auth');

const connectDB = require("./config/database")

const User = require("./Model/user")

const app = express();

app.use(express.json());




app.post("/signup", async (req,res)=>{

   
    const user = new User(req.body)


    try{

        
    await user.save();

    res.send("data saved sucessfully")

    }
    catch(err){

       
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


