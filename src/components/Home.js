import React from 'react'
import logo from '../Assets/logo.png'
import './home.css'
import Footer from './Footer'
import { NavLink } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCardIcon from '@mui/icons-material/AddCard';
import EditIcon from '@mui/icons-material/Edit';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';

const Home = () => {
    const [sidebar,setsidebar]=useState(true)
  return (
    <div className={`layout ${!sidebar ? 'side-inac' : ''}`}>
        <Navbar sidebar={sidebar} setsidebar={setsidebar}/>
        { sidebar ? <Sidebar sidebar={sidebar} setsidebar={setsidebar}/> : ''}
        <div className='searchbar'></div>
        <div className='contents'></div>
        <div className='footer'>
            <Footer />
        </div>
    </div>
  )
}

const Navbar =({sidebar,setsidebar})=>{
   
    const togglesidebar = () => {
      setsidebar(prevState => !prevState);
  };
    return(
        <div className='navbar'>
            <MenuIcon className={'menu-i' } fontSize='large' onClick={togglesidebar}/>
            <img  className='logo'src={logo} />
            <div className='head-t'>
                <span className='logo-1'>AgroMart</span>
                <span className='logo-2'>Grow your world with our palnts</span>
            </div>
            <div className='link-c'>
            <div className='nav-link'>
                <NavLink to='/home' className='link-n'>Home</NavLink>
                <NavLink to='/about' className='link-n'>About us</NavLink>
                <NavLink to='/contact' className='link-n'>Contact us</NavLink>
            </div>
            
            <div className='lg-c'>
                <NavLink to='/login' className='lg-i'>Login</NavLink>
                <NavLink to='/signup' className='lg-i'>Sign up</NavLink>
            </div>
            </div>
        </div>
    )
           
}


const Sidebar = ({sidebar,setsidebar}) => {
    const togglesidebar = () => {
        setsidebar(prevState => !prevState);

        console.log("hellow");
    };

  return (
    <div  className={`sidebar1 ${sidebar ? 'hidden' : ''}`}>
         <div className='side1-header'>
          <span className='side1-h'>AgroMart</span>
          <CancelIcon className='close1-i'fontSize='medium' onClick={togglesidebar}/>
          </div>
          <div className='user-card'>
            <AccountCircleIcon sx={{fontSize:'60px',color:'#084707'}}/>
            <span className='name'>
            <span>Hi,user</span>
            <div className='edit-prof'>
                <EditIcon sx={{fontSize:'15px'}}/>
                <span>Edit profile</span>
            </div>
            </span>
          </div>
          <div className='menu-items'>
             <div className='icon-card'>
                 <HomeIcon sx={{fontSize:'30px'}}/>
                 <span>Home</span>
             </div>
             <div className='icon-card'>
                 <InfoIcon sx={{fontSize:'28px'}}/>
                 <span>About us</span>
             </div>
             <div className='icon-card'>
                 <ShoppingCartIcon sx={{fontSize:'30px'}}/>
                 <span>Cart</span>
             </div>
             <div className='icon-card'>
                 <ListAltIcon sx={{fontSize:'30px'}}/>
                 <span>My orders</span>
             </div>
             <div className='icon-card'>
                 <AddCardIcon sx={{fontSize:'30px'}}/>
                 <span>Add card</span>
             </div>
             <div className='icon-card'>
                 <ContactPageIcon sx={{fontSize:'30px'}}/>
                 <span>Contact us</span>
             </div>
             <div className='icon-card'>
                 <LogoutIcon sx={{fontSize:'30px'}}/>
                 <span>Logout</span>
             </div>
          </div>
    </div>
  )
}


export default Home