import Employee from "../Models/Employeemodel.js"


const getEmployee=async(req,res)=>{
  const data= await Employee.find({})
  res.json({success: true,data:data})
}

const createEmployee=async (req, res) => {
    try {
      console.log(req.body)
      const data = new Employee(req.body);
      await data.save();
      res.send({ success: true, message: "Data saved successfully", data });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).send({ success: false, message: "Error saving data", error: error.message });
    }
  };

  const updateEmployee=async (req, res) => {
    console.log(req.body);
    const { _id, ...rest } = req.body; // Extract ID and other data
    console.log(rest);

    try {
        const data = await Employee.updateOne({ _id }, rest); // Update document
        res.send({ success: true, message: "Data updated successfully", data });
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send({ success: false, message: "Failed to update data" });
    }
};

const deleteEmployee= async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Employee.deleteOne({ _id: id });
      res.send({ success: true, message: "Data deleted successfully", data });
    } catch (error) {
      console.error("Error deleting data:", error);
      res.status(500).send({ success: false, message: "Error deleting data", error: error.message });
    }
  };


export {createEmployee,updateEmployee,deleteEmployee,getEmployee}
  