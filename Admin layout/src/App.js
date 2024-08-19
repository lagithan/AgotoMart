import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import UserAccount from './Components/UserAccount'; 
import ProductsDetails from './Components/ProductsDetails'; 
import Orders from './Components/Orders'; 
import Payments from './Components/Payments'; 
import EmployeeDetails from './Components/EmployeeDetails'; 
import './App.css';

function App() {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/useraccount" element={<UserAccount />} />
          <Route path="/productsdetails" element={<ProductsDetails />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/employeedetails" element={<EmployeeDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
