import express from "express"
const router = express.Router()
import {getEmployees, addEmployee} from "../db/employees.js"

router.route("/")
.get((req,res)=>{
   const employees = getEmployees()
   res.send(employees)
})
.post((req,res)=>{

    const{employee} = req.body

    if (!req.body){
       return res.status(400).send("Request body was not found.")
    }

if(!employee || !employee.name){
    return res.status(400).send("Please send a valid employee.")
}

    addEmployee(employee)
    res.status(201).send(`Added emplyee ${employee}`)
})

export default router