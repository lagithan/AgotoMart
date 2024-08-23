import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './addcard.css'; // Import the CSS file

const Addcard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddCardClick = () => {
    navigate('/index/add-payment-method'); // Navigate to AddPaymentMethod component
  };

  return (
    <div className="addcard-box">
      <h3>No Card Payment Added</h3>
      <p>
        You currently have no payment methods saved. To start adding payment methods, click the button below.
      </p>
      <button className="addcard-button" onClick={handleAddCardClick}>
        ADD CARD
      </button>
    </div>
  );
}

export default Addcard;