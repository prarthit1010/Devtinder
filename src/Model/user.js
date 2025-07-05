const mongoose = require("mongoose");

const validator = require("validator")

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
        validate(value){
            if(!["male", "female","other"].includes(value)){
                throw new Error ("gender data is not valid")
            }
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

const User = mongoose.model("User",userSchema)

module.exports = User;




