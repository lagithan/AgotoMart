import React from 'react';
import { NavLink} from 'react-router-dom';
import { BiSolidUserAccount } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { BsGrid1X2Fill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  
  return (
    <div id="sidebar">
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <NavLink to="/admin/useraccount" className="sidebar-link">
            <BiSolidUserAccount className='icon' />Account Management
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/admin/productsdetails" className="sidebar-link">
            <AiFillProduct className='icon' /> Products Management
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/admin/orders" className="sidebar-link">
            <BsGrid1X2Fill className='icon' /> Orders Management
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/admin/payments" className="sidebar-link">
            <MdPayments className='icon' /> Payments 
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/admin/employeedetails" className="sidebar-link">
            <FaUsersGear className='icon' /> Employee Details
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/" className="sidebar-link">
            <LogoutIcon className='icon' /> Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
