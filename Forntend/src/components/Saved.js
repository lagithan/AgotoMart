
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios
import './saved.css';
import { UserContext } from './Userdata'; // Import UserContext

const SavedPaymentMethods = () => {
  const { user_data } = useContext(UserContext); // Use the UserContext to get the user data
  const [paymentMethods, setPaymentMethods] = useState([]);
  // const [showSuccessMessage, setShowSuccessMessage] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null); // State to track which more options button is active
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // useEffect(() => {
  //   // Set a timeout to hide the success message after 3 seconds (3000ms)
  //   const timer = setTimeout(() => {
  //     setShowSuccessMessage(false);
  //   }, 3000);

  //   // Clean up the timer if the component unmounts
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/payment/get/${user_data.id}`);
        setPaymentMethods(response.data); // Set the payment methods from the response data
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, [user_data]);

  const handleMoreOptionsClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle options visibility
  };

  const handleAddCardClick = () => {
    navigate('/index/add-payment-method'); // Navigate to the AddCard component
  };

  const handleUpdateClick = (paymentId) => {
    navigate(`/index/update/${paymentId}`); // Navigate to the Update component
  };

  const handleDeleteClick = async (paymentId) => {
    console.log(paymentId)
    try {
      if (!paymentId) {
        console.error('Invalid payment ID');
        return;
    }
      const response = await axios.delete(`http://localhost:5000/payment/delete/${paymentId}`);
      if (response.status === 200) {
        setPaymentMethods(paymentMethods.filter(method => method._id !== paymentId)); // Update state to remove deleted method
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
      
      {/* Conditionally render the success message */}
      {/* {showSuccessMessage && (
        <div className="success-message">Card added successfully!</div>
      )} */}

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
            <tr key={method._id}> {/* Use method._id for unique key */}
              <td>{method.cardNumber}</td>
              <td>{method.cardName}</td>
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
                      onClick={() => handleUpdateClick(method._id)} // Pass the _id to handleUpdateClick
                    >
                      Update
                    </button>
                    <button className="delete-button" onClick={()=> handleDeleteClick(method._id)}>Delete</button>
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