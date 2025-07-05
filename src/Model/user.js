const mongoose = require("mongoose");


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
    },

    passwords :{

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




