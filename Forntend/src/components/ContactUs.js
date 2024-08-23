import React from 'react';
import './contactus.css';

const ContactUs = () => {
  return (
    <div>
        <p className='Heading'>Contact Us</p>
    <div className="contact-container">
      <div className="contact-info">
        <h2 className="contact-heading">OUR ADDRESS</h2>
        <p className="address-text">No 205/1, Jayamawatha, Kandawala, Katana, Sri Lanka</p>
        <h2 className="contact-heading">CONTACT US</h2>
        <p className="contact-details">
          Email: <a href="mailto:info@agromart.lk" className="contact-link">info@agromart.lk</a><br />
          Email: <a href="mailto:agromarts1@gmail.com" className="contact-link">agromarts1@gmail.com</a><br />
          Phone: <a href="tel:+94779365318" className="contact-link">+94 779365318</a>
        </p>
      </div>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31678.55896267894!2d79.8575125!3d7.284492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2c11c67d3d22b%3A0x79d8c8d8b839ebf8!2sCeylon%20Agri%20(TRN%20Ceylon%20Agri%20(Pvt)%20Ltd)!5e0!3m2!1sen!2slk!4v1619597021896!5m2!1sen!2slk"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
          className="map-frame"
        ></iframe>
      </div>
    </div>
    </div>
  );
}

export default ContactUs;
