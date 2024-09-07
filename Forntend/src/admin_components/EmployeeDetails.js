import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import Popup from './Popup';
import './employeedetails.css';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [editEmployeeIndex, setEditEmployeeIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    location: '',
    serviceAreas: '',
    role: ''
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/employee/get");
      console.log("Fetched employees data:", response.data);

      if (response.data.success) {
        setEmployees(response.data.data); // Assuming `response.data.data` contains the employee list
      } else {
        console.error("Failed to fetch employees:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Error fetching employees. See console for details.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditClick = (index) => {
    setEditEmployeeIndex(index);
    setFormData(employees[index]);
    setButtonPopup(true);
  };

  const handleAddButtonClick = () => {
    setEditEmployeeIndex(null); // Ensure editEmployeeIndex is reset to null
    setFormData({
        name: '',
        contactNumber: '',
        email: '',
        location: '',
        serviceAreas: '',
        role: ''
    });
    setButtonPopup(true); // Open the popup
  };

  const handleAddOrUpdateEmployee = async (e) => {
    e.preventDefault();

    try {
        let response;

        if (editEmployeeIndex !== null) {
            // Update existing employee
            const employeeId = employees[editEmployeeIndex]._id;
            console.log(`Updating employee with ID: ${employeeId}`);

            // Add ID to formData for the update request
            const updatedFormData = { ...formData, _id: employeeId };

            response = await axios.put("/employee/update", updatedFormData); // Use the updated formData with ID
        } else {
            // Add new employee
            console.log("Adding new employee");
            response = await axios.post("/employee/create", formData);

            // Clear form data after adding a new employee
            setFormData({
                name: '',
                contactNumber: '',
                email: '',
                location: '',
                serviceAreas: '',
                role: ''
            });
        }

        console.log("Add/Update response:", response.data);

        if (response.data.success) {
            alert(response.data.message);
            setButtonPopup(false);
            fetchEmployees(); // Re-fetch the data after a successful add/update
        } else {
            console.error("Failed to add/update employee:", response.data.message);
            alert(`Failed: ${response.data.message}`);
        }
    } catch (error) {
        console.error("Error adding or updating employee:", error);
        alert(`Error occurred: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDeleteClick = async (index) => {
    try {
      const employeeId = employees[index]._id;
      console.log(`Deleting employee with ID: ${employeeId}`);
      
      const response = await axios.delete(`employee/delete/${employeeId}`);
      console.log("Delete response:", response.data);

      if (response.data.success) {
        fetchEmployees(); // Re-fetch the data after a successful delete
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees(); // Call the function when the component mounts
  }, []);

  return (
    <div className="employee-details-container">
      <div className='employee-header'>
        <h2>Employee Details</h2>
        <button onClick={handleAddButtonClick} className='add-button1'>Add Employee</button>
      </div>
      
      <div className='table-container'>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Details</th>
              <th>Location</th>
              <th>Service Areas</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>
                    {employee.contactNumber}<br/>
                    {employee.email}
                  </td>
                  <td>{employee.location}</td>
                  <td>{employee.serviceAreas}</td>
                  <td>{employee.role}</td>
                  <td className="action-buttons">
                    <button className="update-button1" onClick={() => handleEditClick(index)}>
                      <MdEdit className='icon' /> Update
                    </button>
                    <button className="delete-button1" onClick={() => handleDeleteClick(index)}>
                      <RiDeleteBin6Fill className='icon' /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6">No data</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className='popup-content'>
          <button className="close-button1" onClick={() => setButtonPopup(false)}>
            &times;
          </button>
          <div className="popup-heading">
            <h3>{editEmployeeIndex !== null ? 'Update Employee' : 'Add New Employee'}</h3>
          </div>
          <form onSubmit={handleAddOrUpdateEmployee}>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter the name" required />
            </label>
            <div className="contact-info2">
              <label>
                Contact No:
                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} placeholder="Enter phone number" required />
              </label>
              <label>
                Email:
                <input type="text" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address" required />
              </label>
            </div>
            <label>
              Location:
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter the location" required />
            </label>
            <label>
              Service Areas:
              <input type="text" name="serviceAreas" value={formData.serviceAreas} onChange={handleInputChange} placeholder="Enter the service area"  />
            </label>
            <label>
              Role:
              <select name="role" value={formData.role} onChange={handleInputChange} required>
                <option value="" disabled>Select Role</option>
                <option value="Store Manager">Store Manager</option>
                <option value="Sales Associate">Sales Associate</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Accountant">Accountant</option>
              </select>
            </label>

            <div className="button-container">
              <button type="submit" className="add-button1">
                {editEmployeeIndex !== null ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </Popup>
    </div>  
  );
}

export default EmployeeDetails;
