const express = require('express');

const app = express();

app.use("/admin",(req,res,next)=>{
   
    console.log("console is print .................")
    const token = "prarthit";

    const isAuth = token === "prarthit";

    if(isAuth){
     next()

    }
    else {
        res.status(402).send("uthintication error")
    }
    
})


app.use("/admin/getdata",(req,res,next)=>{

    res.send("get the data")
})

app.listen(4000,()=> {  console.log("server is running port number 4000.......");
    
}
);
