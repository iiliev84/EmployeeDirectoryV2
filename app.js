import express from "express";
const app = express()
import employeeRouter from "./api/data.js"
import employees from "#db/employees";
//Body parsing middleware
app.use(express.json())

// Logging middleware
app.use((req,res,next) =>{
    console.log(req.method, req.originalUrl)
    next()
})

//Routing
app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.route("/employees").get((req, res) => {
  res.send(employees);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
app.route("/employees/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

app.route("/employees/:id").get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send(`Employee with id ${id} not found.`);
  }

  res.send(employee);
  });

app.use("/employees", employeeRouter)


//Error handling middleware
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).send("An error occurerd " + err)
})

export default app