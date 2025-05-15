import express from "express"
const router = express.Router()
import {getEmployees, addEmployee} from "../db/employees.js"

router.route("/")
.get((req,res)=>{
   const employees = getEmployees()
   res.send(employees)
})
.post((req,res)=>{
    
    const{name} = req.body

    if (!req.body){
        return res.status(400).send("Request body was not found.")
    }

    if(name.trim() == ""){
        return res.status(400).send("Please enter a valid employee name.")
    }

    addEmployee({name})
    res.status(201).send(`Added employee ${name}`)
})

export default router