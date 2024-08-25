import React, { useState } from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import Popup from './Popup';
import './employeedetails.css';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([
    {
      name: 'Alice Johnson',
      contactNumber: '555-123-4567',
      email: 'alice.johnson@plantplatform.com',
      location: '123 Bloom St, Portland, OR 97201',
      serviceAreas: 'Northwest Region',
      role: 'Store Manager'
    },
    {
      name: 'Bob Smith',
      contactNumber: '555-987-6543',
      email: 'bob.smith@plantplatform.com',
      location: '456 Green Rd, Seattle, WA 98101',
      serviceAreas: 'Southwest Region',
      role: 'Sales Associate'
    },
    {
      name: 'Carol Williams',
      contactNumber: '555-678-1234',
      email: 'carol.williams@plantplatform.com',
      location: '789 Garden Ave, San Francisco, CA 94101',
      serviceAreas: 'West Coast Region',
      role: 'HR Manager'
    }
  ]);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddOrUpdateEmployee = (e) => {
    e.preventDefault();
    if (editEmployeeIndex !== null) {
      const updatedEmployees = employees.map((employee, index) =>
        index === editEmployeeIndex ? formData : employee
      );
      setEmployees(updatedEmployees);
      setEditEmployeeIndex(null);
    } else {
      setEmployees([...employees, formData]);
    }
    setFormData({
      name: '',
      contactNumber: '',
      email: '',
      location: '',
      serviceAreas: '',
      role: ''
    });
    setButtonPopup(false);
  };

  const handleEditClick = (index) => {
    setEditEmployeeIndex(index);
    setFormData(employees[index]);
    setButtonPopup(true);
  };

  const handleDeleteClick = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  return (
    <div className="employee-details-container">
      <div className='employee-header'>
        <h2>Employee Details</h2>
        <button onClick={() => setButtonPopup(true)} className='add-button1'>Add Employee</button>
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
            {employees.map((employee, index) => (
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
            ))}
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
            <div className="contact-info">
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
                 <select name="role" value={formData.role} onChange={handleInputChange} required placeholder= 'Select Role'>
                 <option value="Store Manager">Store Manager</option>
                 <option value="Sales Associate">Sales Associate</option>
                 <option value="HR Manager">HR Manager</option>
                 <option value="Product Manager">Product Manager</option>
                 <option value="Customer Support">Customer Support</option>
                 <option value="Accountant">Accountant</option>
                 </select>
            </label>

            <div className="button-container">
              <button type="submit" className="add-button">
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
