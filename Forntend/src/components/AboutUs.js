import React from 'react';
import './aboutus.css';
import plant from '../Assets/plant.jpg';

const AboutUs = () => {
  return (
    <div>
      <p className='heading'>About Us</p>
      <div className="main-box">
        <div className='text-image-container'>
          <div className='text-container'>
            <div className='sub-box1'>
              <p className='subheading1'>Welcome to AgroMart (Pvt) Ltd</p>
              <p className='para1'>We are an agricultural company based in this marvellous island Sri Lanka. Since 2019, We provide the best plants and agricultural products along with the expertise guidance in gardening. Not only for mass agricultural purposes, but also for the ones who love to keep a beautiful rich green garden, AgroMart will be the best destination to fill up your expectations. We are following the vision of providing our greatest devotion towards the nature to sustain a green future.</p>
            </div>
            <div className='mission-vision-container'>
              <div className='sub-box2'>
                <p className='subheading2'>Our Mission</p>
                <p className='para2'>Being the pioneer in providing the best quality plants, agricultural products and also the expertise guidance in gardening to spring up your lives. We are dedicated to build lasting relationships with our customers and provide them with exceptional products to meet their requirements.</p>
              </div>
              <div className='sub-box3'>
                <p className='subheading3'>Our Vision</p>
                <p className='para3'>To offer our ultimate gratitude towards this amazing nature by providing the best agricultural plants and products in order sustain a greener future.</p>
              </div>
            </div>
          </div>
          <div className='image-container'>
            <img src={plant} alt="Plant"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
