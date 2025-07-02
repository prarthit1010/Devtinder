const express = require('express');
const { adminauth } = require('./middleware/auth');

const app = express();

app.use("/admin",adminauth)


app.use("/admin/getdata",(req,res,next)=>{

    res.send("get the data")
})

app.listen(4000,()=> {  console.log("server is running port number 4000.......");
    
}
);
