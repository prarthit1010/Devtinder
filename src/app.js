const express = require('express');
const connectDB = require("./config/database");
const User = require("./Model/user");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// get the data from the email ID
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });

    if (users.length === 0) {
      return res.status(400).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    console.error("Error while fetching user:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

//Update the Data 

app.patch("/user",async (req,res)=>{

  const userId = req.body.userId;

  const data = req.body;

  try{
    const user = await User.findByIdAndUpdate(userId,data);
    res.send("User updated Sucessfully");
  }
  catch(err){
     res.status(500).send("Internal Server Error");
  }
});



// feed get the all data from the database


app.get("/feed",async(req,res)=>{

try{

  const allUser = await User.find({});
if (allUser.length === 0) {
      return res.status(400).send("User not found");
    } else {
      res.send(allUser);
    }
  } catch (err) {
    console.error("Error while fetching user:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

// delete user using the id

app.delete("/user",async (req,res)=> {

  const userId = req.body.userId;

  try{

    const user = await User.findByIdAndDelete(userId)

    res.send("user delated sucessfully")
  }

  catch (err) {
    console.error("Error while fetching user:", err.message);
    res.status(500).send("Internal Server Error");
  }


})


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
