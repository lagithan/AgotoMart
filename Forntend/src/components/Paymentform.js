import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './PaymentForm.css';
import { useLocation,useNavigate } from 'react-router-dom';
import { UserContext } from './Userdata';

const PaymentForm = () => {
  const {user_data} = useContext(UserContext);
  const location = useLocation();
  const totalprice = location.state.totalprice;
  const formdata = location.state.formdata;
  const navigate =useNavigate();
  const [cardData, setCardData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardname: '',
    cardnumber: '',
    expiryDate: '',
    cvv: ''
  });


  const handlepayment = async () => {
    console.log(formdata);
    if (Array.isArray(formdata)) {
      formdata.forEach(async (data) => {
        try {
          const response = await axios.post('http://localhost:5000/orders/place', {
            ...data,
            paymentMethod: "Paid"
          });
        } catch (error) {
          console.error('Error placing order:', error);
          alert('An error occurred. Please try again.');
        }
      });

      alert('Order placed successfully!');
      navigate('/index');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/orders/place', {
          ...formdata,
          paymentMethod: "Paid"
        });
  
        if (response.status === 201) {
          alert('Order placed successfully!');
          navigate('/index');
        }
      } catch (error) {
        console.error('Error placing order:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  const addpayment = async (carddata)=>{
     try{
      const response = await axios.post('http://localhost:5000/payment/adddetails',carddata);
      if (response.status === 201) {
      }
     }

     catch(error){
      console.error('Error placing order:', error);
      alert('An error occurred. Please try again.');
     }
  }
  

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/payment/get/${user_data.id}`);
        setCardData(response.data);
        if (response.data.length > 0) {
          setShowPopup(true);
        }
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, ['']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handlePay = async () => {
    const carddata ={...paymentDetails,userid:user_data.id,totalamount:totalprice}
    addpayment(carddata);
    handlepayment();
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const selectCard = async (card) => {
    setSelectedCard(card);
    const paymenttdata ={...paymentDetails,cardname:card.cardName,cardnumber:card.cardNumber,userid:user_data.id,totalamount:totalprice}
    addpayment(paymenttdata);
    setShowPopup(false);
    handlepayment();
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
                name="cardname"
                value={paymentDetails.cardname}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input
                type="text"
                id="card-number"
                name="cardnumber"
                value={paymentDetails.cardnumber}
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
              <span>Rs.{totalprice}</span>
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
