import express from "express";
const app = express()
import employeeRouter from "./api/data.js"

//Body parsing middleware
app.use(express.json())

// Logging middleware
app.use((req,res,next) =>{
    console.log(req.method, req.originalUrl)
    next()
})

//routing goes in here
app.route("/").get((req,res)=>{
    res.send("Hello Employees!")
})

app.use("/employees", employeeRouter)


//Error handling middleware
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).send("An error occurerd " + err)
})

export default app