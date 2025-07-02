const adminauth = (req,res,next)=>{
   
    console.log("console is print .................")
    const token = "prarthit";

    const isAuth = token === "prarthit";

    if(isAuth){
     next()

    }
    else {
        res.status(402).send("uthintication error")
    }
    
}

module.exports={
    adminauth
}