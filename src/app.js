const express = require('express');
const connectDB = require("./config/database");
const User = require("./Model/user");
const cookieParser = require("cookie-parser");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middleware/auth")

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());





// Signup route
app.post("/signup", async (req, res) => {
  
  
  
  try {

  //validation of the data
  validateSignUpData(req);

  //enrypt the password
  const { firstName,lastName,emailId, password } = req.body;
const passwordHash = await bcrypt.hash(password,10)
console.log(passwordHash);
  

    const user = new User({firstName,lastName,emailId, password : passwordHash,});
    await user.save();

    res.status(201).send("Data saved successfully");
  } catch (err) {
    console.error("Error while saving user:", err.message);
    res.status(500).send("Failed to save user data" + err.message);
  }
});


// get profile

app.get("/profile", userAuth, async (req, res) => {
  try {

    const user = req.user;

    res.send(user);
  } catch (err) {
    console.error("Error in /profile:", err.message);
    res.status(401).send("Unauthorized: " + err.message);
  }
});

// login api

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
     

      //create jsw token

      const token = await user.getJWT();

      //add cokkie and send back response to user

      res.cookie("token",token)
       res.send("Login Successful!!!");


    } else { 
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//send connection request

app.post("/sendConnectionrequest" , userAuth,  async (req,res) => {
 const user  = req.user;
  // sendind the connection request
  console.log("sendind the connection request");

  res.send("connection request is send........ by " + user.firstName);
  
})









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

app.patch("/user/:userId", async (req, res) => {

  const userId = req.params?.userId;

  const data = req.body;



  const ALLOWED_UPDATES = ["photoUrl","age","about", "gender"];

  const isUPADTESALLOWED = Object.keys(data).every((k) =>
     ALLOWED_UPDATES.includes(k));


  if(!isUPADTESALLOWED){
    res.status(400).send("Upadets is not Allowed.");
  }



  // Optional: Clean emailId if present
  if (data.emailId) {
    data.emailId = data.emailId.trim();
  }

  try {


    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
      new: true
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send("User updated successfully");
  } catch (err) {
    console.error("Error while updating user:", err.message);
    res.status(500).json({
      message: "Failed to update user",
      error: err.message
    });
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
