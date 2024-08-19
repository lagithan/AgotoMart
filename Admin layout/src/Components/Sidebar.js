import React from 'react';
import { NavLink } from 'react-router-dom';
import { BiSolidUserAccount } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { BsGrid1X2Fill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { FaShippingFast, FaUsers } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div id="sidebar">
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <NavLink to="/useraccount" className="sidebar-link">
            <BiSolidUserAccount className='icon' />Account Management
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/productsdetails" className="sidebar-link">
            <AiFillProduct className='icon' /> Products Management
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/orders" className="sidebar-link">
            <BsGrid1X2Fill className='icon' /> Orders Management
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/payments" className="sidebar-link">
            <MdPayments className='icon' /> Payments 
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/employeedetails" className="sidebar-link">
            <FaUsersGear className='icon' /> Employee Details
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
