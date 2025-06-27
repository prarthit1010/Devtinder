const express = require('express');

const app = express();


// this will only handle get request
app.get("/ravi",(req,res)=>{
    res.send({firstame :"Ravi", lastnaem : "Patel"})
})

// this will only handle post request
app.post("/ravi",(req,res)=>{
    res.send("data sucessuflly added to database")
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
