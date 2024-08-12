import React from 'react';
import './footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='box-1'>
        <div>
        <span className='f-h'>AgroMart</span>
        <div className='f-h2'>Grow your world with our plants</div>
        </div>
        <span>Head office at  Collingwood place<br/>Colombo 06</span>
      </div>
      <div className='box-2'>
        <span style={{fontSize:'20px',fontWeight:'bold'}}>Our Services</span>
        <span>Deliver all over Srilanka</span>
        <span>Customer support</span>
        <span>Best quality products</span>
      </div>
      <div className='box-2'>
        <span style={{fontSize:'20px',fontWeight:'bold'}}>Our Expertise</span>
        <span>Organic and Eco-Friendly Products</span>
        <span>Online Plant Care Resources</span>
        <span>Seasonal Plant Collections</span>
      </div>
      <div className='box-2'>
        <span style={{fontSize:'20px',fontWeight:'bold'}}>Contact us</span>
        <span>Hotline 1 - 011214582455</span>
        <span>Hotline 2- 011825565775</span>
        <span>Email-agromart26@gmail.com</span>
      </div>
      
      <div className='box-3'>
        <div className='f-h'>Follow us on</div>
         <div className='ficon-c'>
           <FacebookIcon sx={{fontSize:'45px'}}/>
           <InstagramIcon sx={{fontSize:'45px'}}/>
           <XIcon sx={{fontSize:'45px'}}/>
         </div>
        <span> </span>
      </div>
    </div>
  )
}

export default Footer
    
