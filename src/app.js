const express = require('express');

const app = express();
app.use("/ravi",(req,res) =>{
    res.send("message from the server created by RAvi")
})

app.use("/prarthit",(req,res) =>{
    res.send("message from the server created by Prarthitttt")
})
app.use("/dd",(req,res) =>{
    res.send("message from the server created by dd")
})

app.use("/",(req,res) =>{
    res.send("message from the server created by bhuri")
})



app.listen(4000,()=> {  console.log("server is running port number 3000.......");
    
}
);
