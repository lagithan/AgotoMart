import User from "../Models/Usermodel.js";
import address from "../Models/addressmodel.js";


const getuser = async(req,res) =>{
  try{
    const result = await User.find();
    res.status(201).json(result);
  }

  catch(error){
    res.status(400);
  }
}

const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log(`Updating user with ID: ${id}`);

  const { username, email, phonenumber } = req.body;

  try {
    // Find the user by ID and update the fields
    const result = await User.findByIdAndUpdate(
      id,
      { username, email, phonenumber },
      { new: true } // Option to return the updated document
    );

    // Check if the user was found and updated
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return success response
    res.json({
      message: "User details updated successfully",
      updatedUser: result,
    });
  } catch (err) {
    // Handle errors (e.g., database errors)
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Failed to update User details" });
  }
};

const createaddress = async (req, res) => {
  // Extracting data from the request body
  const { userid, addressData } = req.body;

  try {
    // Create a new address document
    const newaddress = new address({
      userid,
      address1: addressData.addressLine1,
      address2: addressData.addressLine2,
      address3: addressData.addressLine3,
    });

    // // Save the new address to the database
    const savedaddress = await newaddress.save();

    // Return success response
    res.json({
      message: "address created successfully",
      address: savedaddress,
    });
  } catch (err) {
    // Handle errors (e.g., database errors)
    console.error("Error creating address:", err);
    res.status(500).json({ error: "Failed to create address" });
  }
};

const deleteuser = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the user by ID and delete them
    const result = await User.findByIdAndDelete(id);
    await address.deleteOne({ userid: id });

    // Check if the user was found and deleted
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send a success response
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    // Send an error response
    res.status(500).json({ message: "Failed to delete user" });
  }
};

const getaddress =async (req,res)=>{
  try{
    const result = await address
    .findOne({ userid: req.params.id })   
    .sort({ updatedAt: -1 })       
    res.status(201).json(result)
  }

  catch(error){
    res.status(400)
  }
}

export { updateUser, createaddress, deleteuser,getaddress,getuser };
