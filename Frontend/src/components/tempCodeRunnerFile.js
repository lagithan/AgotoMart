import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './saved.css'; // Import the CSS file

const SavedPaymentMethods = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null); // State to track which more options button is active
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    // Set a timeout to hide the success message after 3 seconds (3000ms)
    const timer = setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const paymentMethods = [
    { cardNumber: '**** **** 4567', name: 'Siva', expiryDate: '5/27/15' },
    { cardNumber: 'Customer', name: 'Labour', expiryDate: '5/19/12' },
    { cardNumber: 'Customer', name: 'Family', expiryDate: '3/4/16' },
    { cardNumber: 'Customer', name: 'Direct', expiryDate: '3/4/16' },
    { cardNumber: 'Customer', name: 'Criminal', expiryDate: '7/27/13' },
    { cardNumber: 'Customer', name: 'Election', expiryDate: '5/27/15' },
    { cardNumber: 'Customer', name: 'Indirect T', expiryDate: '7/11/19' },
  ];

  const handleMoreOptionsClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle options visibility
  };

  const handleAddCardClick = () => {
    navigate('/index/addcard'); // Navigate to the AddCard component
  };

  const handleUpdateClick = () => {
    navigate('/index/update'); // Navigate to the Update component
  };

  return (
    <div className="saved-payment-methods">
      <h2>Saved Payment Methods</h2>
      
      {/* Conditionally render the success message */}
      {showSuccessMessage && (
        <div className="success-message">Card added successfully!</div>
      )}

      <div className="header2">
        <button className="add-card-button" onClick={handleAddCardClick}>
          ADD CARD +
        </button>
      </div>

      <table className="payment-methods-table">
        <thead>
          <tr>
            <th>Card Number</th>
            <th>Name</th>
            <th>Expiry Date</th>
            <th style={{ width: '4%' }}></th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map((method, index) => (
            <tr key={index}>
              <td>{method.cardNumber}</td>
              <td>{method.name}</td>
              <td>{method.expiryDate}</td>
              <td className="options-cell">
                <button 
                  className="more-options-button"
                  onClick={() => handleMoreOptionsClick(index)}
                >
                  ⋮
                </button>
                {activeIndex === index && (
                  <div className="options-menu">
                    <button 
                      className="update-button" 
                      onClick={handleUpdateClick}
                    >
                      Update
                    </button>
                    <button className="delete-button">Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedPaymentMethods;