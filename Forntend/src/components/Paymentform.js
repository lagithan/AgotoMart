import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentForm.css';
import { useLocation,useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const { state } = useLocation();
  const navigate =useNavigate();
  const [cardData, setCardData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/payment/get/${state.user_id}`);
        setCardData(response.data);
        if (response.data.length > 0) {
          setShowPopup(true);
        }
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, [state.user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handlePay = async () => {
    try {
      
        const response = await axios.post('http://localhost:5000/orders/place', state);
        if (response.status === 201) {
          alert('Order placed successfully!');
          navigate('/index'); 
          alert('Failed to place order.');
        }
      } catch (error) {
        console.error('Error placing order:', error);
        alert('An error occurred. Please try again.');
      }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const selectCard = async (card) => {
    setSelectedCard(card);
    setShowPopup(false);
    console.log(card);

    try {
      
        const response = await axios.post('http://localhost:5000/orders/place', {...state,paymentMethod:"Paid"});
        if (response.status === 201) {
          alert('Order placed successfully!');
          navigate('/index'); 
        }
      } catch (error) {
        console.error('Error placing order:', error);
        alert('An error occurred. Please try again.');
      }
  };

  return (
    <div>
      {showPopup && (
        <div className="popup2">
          <button onClick={closePopup} className="close-button3">&times;</button>
          <h3>Select a Card for Payment</h3>
          {cardData.map((card, index) => (
            <li key={index} className="card-item">
              <p>Cardholder Name: {card.cardName}</p>
              <p>Card Number: **** **** **** {card.last4Digits}</p>
              <p>Expiry: {card.expiryDate}</p>
              <button onClick={() => selectCard(card)} className="select-card-button">
                Select Card
              </button>
            </li>
          ))}
        </div>
      )}
      {!showPopup && (
        <div className="payment-container">
          <form className="payment-form">
            <h2>Payment Details</h2>
            <div className="form-group">
              <label htmlFor="cardholder-name">Cardholder Name</label>
              <input
                type="text"
                id="cardholder-name"
                name="cardName"
                value={paymentDetails.cardName}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input
                type="text"
                id="card-number"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiry-date">Expiry Date</label>
                <input
                  type="text"
                  id="expiry-date"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleChange}
                  placeholder="123"
                />
              </div>
            </div>
            <div className="total-amount">
              <label>Total Amount:</label>
              <span>Rs.{state.items[0].totalPrice}</span>
            </div>
            <button type="button" className="pay-button" onClick={handlePay}>
              Pay Now
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
