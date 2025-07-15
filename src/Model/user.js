const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    firstName : {
        type: String,
        required : true,
        minLength : 4,

    },
    lastName : {
        type: String,
        required : true
    },

    emailId : {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim : true, 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("inValid Email Adreess" + value)
            }
        }
    },

    password :{

        type: String,
    },

    mobileNumber:{

        type: Number,
    },

    gender :{

        type : String,
        
        enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
        }, 
      
    },

    age :{
        type : Number,
        min : 18,
    },
    photoUrl :{

        type: String,
         default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fphotography&psig=AOvVaw3J_dQ7TCnlJcMcyIt-Xwb1&ust=1751784494076000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCt9PWPpY4DFQAAAAAdAAAAABAE",
        
    },
    
    about :{

        type: String,
        default : "this is a default value of user"
    },
},{
    timestamps: true,
});

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);





