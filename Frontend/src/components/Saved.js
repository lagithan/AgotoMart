
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './saved.css';
import { UserContext } from './Userdata'; 

const SavedPaymentMethods = () => {
  const { user_data } = useContext(UserContext); 
  const [paymentMethods, setPaymentMethods] = useState([]); 
  const [activeIndex, setActiveIndex] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/payment/get/${user_data.id}`);
        setPaymentMethods(response.data); 
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
      }
    };
    fetchPaymentMethods();
  }, [user_data]);

  const handleMoreOptionsClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };



  const handleUpdateClick = (paymentId) => {
    navigate(`/index/update/${paymentId}`);
  };

  const handleDeleteClick = async (paymentId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/payment/delete/${paymentId}`);
      if (response.status === 200) {
        setPaymentMethods([]);
        navigate('/index/addcard');
      } else {
        console.error('Failed to delete payment method:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred while deleting payment method:', error);
    }
  };

  return (
    <div className="saved-payment-methods">
      <h2>Saved Payment Methods</h2>
      {/* <div className="header2">
        {paymentMethods.length === 0 && (
          <button className="add-card-button" onClick={handleAddCardClick}>
            ADD CARD +
          </button>
        )}
      </div> */}
      <br></br>
      <br></br>
      {paymentMethods.map((method, index) => (
  <div key={method._id} className="card-container">
    
    <div className="card-emoji">
      💳 {/* Card emoji */}
    </div>
    <div className="card-details">
      <p><strong>Card Number:</strong> {method.cardNumber}</p>
      <p><strong>Name:</strong> {method.cardName}</p>
      <p><strong>Expiry Date:</strong> {method.expiryDate}</p>
    </div>
    <div className="card-options">
      <button 
        className="more-options-button"
        onClick={() => handleMoreOptionsClick(index)}
      >
        ⋮
      </button>
      {activeIndex === index && (
        <div className="options-menu">
          <button className="update-button" onClick={() => handleUpdateClick(method._id)}>Update</button>
          <button className="delete-button" onClick={() => handleDeleteClick(method._id)}>Delete</button>
        </div>
      )}
    </div>
  </div>
))}
     
    </div>
  );
};

export default SavedPaymentMethods;