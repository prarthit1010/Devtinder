const mongoose = require("mongoose");


const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ravi001pp:8C2YOL62CFzxDwSU@namastenodejs.urnux7p.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNodejs"
  );
};


module.exports= connectDB;


