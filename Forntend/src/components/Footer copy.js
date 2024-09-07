import React from 'react';
import './footer copy.css';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-item">
          {/* <img src="/delivery.png" alt="Delivery" /> */}
          <LocalShippingOutlinedIcon/>
          <span>Delivery within 7 days</span>
        </div>
        <div className="footer-item">
       {/*    <img src="/online-payment.png" alt="Online Payment" /> */}
       <PaymentsOutlinedIcon/>
          <span>Online payment</span>
        </div>
        <div className="footer-item">
         {/*  <img src="/secure-payment.png" alt="Secure Payment" /> */}
         <ShieldOutlinedIcon/>
          <span>Secure payment</span>
        </div>
      </div>
      <span className='endtext'> No returns will be accepted !!</span>
    </div>
  );
};

export default Footer;