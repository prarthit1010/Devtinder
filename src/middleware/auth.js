const jwt = require("jsonwebtoken");
const User = require("../Model/user");

const userAuth = async (req,res,next) =>{
  
  try
    {// read token from the usr
    const {token} = req.cookies;

    if(!token){

      throw new Error ("Token is not valid!!!!!!!!!")
    }

  // validate the token
    const decodeObj = await jwt.verify(token,"DEV@Tinder$790")

    //find username
    const {_id} = decodeObj;
    const user = await User.findById(_id);

    if(!user){
        throw new Error("user not found");
    }

    req.user = user;
    next();
}
    catch (err) {

    res.status(400).send("Error " + err.message);
  }

};

module.exports={
    userAuth
}