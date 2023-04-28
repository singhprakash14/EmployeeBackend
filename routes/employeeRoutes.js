const express = require("express");
const { createEmployee, getAllEmployees, updateEmployee, getSingleEmployee } = require("../controllers/employee.controller");
const router = express.Router();




router.route("/employees").post(createEmployee).get(getAllEmployees);

router.route("/employees/:id").put(updateEmployee).get(getSingleEmployee);

// Error handler for routes that don't exist
router.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});


module.exports = router;
