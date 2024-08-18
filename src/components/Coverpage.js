import React, { useState } from 'react';
import './coverpage.css';
import { NavLink, useNavigate } from 'react-router-dom';
import plantimg from '../Assets/plant.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Coverpage = () => {
  const [sidebar,setsidebar]=useState(false)
  const Navigate=useNavigate();
  const togglesidebar = () => {
    setsidebar(prevState => !prevState);
   
};
const handelnavigate=()=>{
  Navigate('/index');
}
  return (
    <div className='cover'>
      <div className='body'>
          <div className={`menu-icon ${sidebar ? 'deactive' : ''}`}>
          <MenuIcon className={'menu-i' } fontSize='large' onClick={togglesidebar}/>
          </div>
          <div  className={`sidebar ${sidebar ? 'active' : ''}`}>
          <div className='side-header'>
          <span className='side-h'>AgroMart</span>
          <CloseIcon className='close-i'fontSize='medium' onClick={togglesidebar}/>
          </div>
          <NavLink to="/index"className='link-b' >
          Home
        </NavLink>
        <NavLink to="/about"className='link-b' >
          About us
        </NavLink>
        <NavLink to="/contact"className='link-b'>
          Contact us
        </NavLink>
        <NavLink to="/login" className='link-b'>
            Login
          </NavLink>
          <NavLink to="/signup" className='link-b' >
            Sign up
          </NavLink>
          </div>
          <h1>AgroMart</h1>
      <div className='header'>
        <div className='link-c'>
        <NavLink to="/index" className='link'>
          Home
        </NavLink>
        <NavLink to="/about"className='link' >
          About us
        </NavLink>
        <NavLink to="/contact"className='link'>
          Contact us
        </NavLink>
        </div>
        <div className='login' >
          <NavLink to="/login" className='link'>
            Login
          </NavLink>
          <NavLink to="/signup" className='link' >
            Sign up
          </NavLink>
        </div>
      </div>
      <div className='content'>
        <div className='text'>
        
        <div className='discripition'>
          <span>Grow your world with our plants </span>
          <p>Your go-to online store for premium plants, seeds, and fertilizers. Find everything you need to grow a flourishing garden, from vibrant flowers to nutritious veggies.</p>
        </div>
        <button  className='hero-btn' onClick={handelnavigate}>Get your order</button>
        </div>
        <div className='img-container'>
          <img className='img-c' src={plantimg} style={{backgroundSize:'contain',marginTop:'50px'}}/>
        </div>
      </div>
      </div>
    </div>
   
  );
};

export default Coverpage;
