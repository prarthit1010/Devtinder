const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    firstName : {
        type: String,

    },
    lastName : {
        type: String,
    },

    emailId : {
        type : String,
    },

    passwords :{

        type: String,
    },

    mobileNumber:{

        type: Number,
    },

    gender :{

        type : String,
    },

    age :{
        type : Number,
    }
});

const User = mongoose.model("User",userSchema)

module.exports = User;