import React from 'react';
import logo from '../Assets/logo.png';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <img className='logo' src={logo} alt="Logo" />
            <div className='head-t'>
                <span className='logo-1'>AgroMart</span>
                <span className='logo-2'>Grow your world with our plants</span>
            </div>
            <div className='link-c'>
                <NavLink to='/login' className='lg-i'>Login</NavLink>
            </div>
        </div>
    );
};

export default Navbar;
