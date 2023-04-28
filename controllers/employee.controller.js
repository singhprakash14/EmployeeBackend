const Employee=require('../model/Employee')


exports.createEmployee=async(req,res)=>{
    //   const name = req.body.e_name;
    //   const address = req.body.e_address;
    //   const age = req.body.e_age;
    //   const department = req.body.e_department;
    //   const status = req.body.e_status;
    //   const lat = req.body.lat;
    //   const long = req.body.long;

      const {name,address,age,department,status,lat,long}=req.body
        if (
          !name ||
          !address ||
          !age ||
          !department ||
          !status ||
          !lat ||
          !long
        ) {
          return res
            .status(400)
            .send({ message: "Missing required field(s)!" });
        }
      try {
        const employee = new Employee({
          name,
          address,
          age,
          department,
          status,
          lat,
          long,
        });
        let new_employee = await employee.save();
       return res.send({ message: "Employee created successfully!", new_employee });
      } catch (err) {
        return res.status(404).send({ message: err.message });
      }
}

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!employee) {
      return res.status(404).send({ message: "Employee not found" });
    }

  return  res.send({ message: "Employee updated successfully", data: employee });
  } catch (err) {
   return res.status(500).send({ message: "Internal Server Error",error:err.message });
  }
};


exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});

    if (!employees) {
      return res.status(404).send({ message: "No employees found" });
    }

  return  res.send(employees);
  } catch (err) {
   return res.status(500).send({ message: "Internal Server Error",error:err });
  }
};


exports.getSingleEmployee=async(req,res)=>{
      const {id} = req.params;
      try {
        const employees = await Employee.findById(id);
         if (!employees) {
           return res.status(404).send({ message: "No employees found" });
         }
      return  res.send(employees);
      } catch (err) {
      return  res.status(404).send({ message: err.message });
      }
}