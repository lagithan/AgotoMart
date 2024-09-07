import mongoose from 'mongoose';

const schemaData = mongoose.Schema({
    name: String,
    contactNumber:String, 
    email: String, 
    location: String,
    serviceAreas: String,   
    role: String
  },{
    timestamps: true
  });
  
  const Employee = mongoose.model("employee",schemaData)

  export default Employee