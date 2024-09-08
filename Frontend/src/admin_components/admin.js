import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import UserAccount from './UserAccount'; 
import ProductsDetails from './ProductsDetails'; 
import Orders from './Orders'; 
import Payments from './Payments'; 
import EmployeeDetails from './EmployeeDetails'; 
import './admin.css';

function Admin() {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route index  element={<UserAccount />} />
          <Route path='useraccount'  element={<UserAccount />} />
          <Route path="productsdetails" element={<ProductsDetails />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<Payments />} />
          <Route path="employeedetails" element={<EmployeeDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
