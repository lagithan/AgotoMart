import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams hooks
import './update.css'; // Import the CSS file
import axios from 'axios';
import { UserContext } from './Userdata'; 

const Update = () => {
  const { user_data } = useContext(UserContext); 
  const { id } = useParams(); // Get the payment method ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({}); // State for storing error messages
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentMethod = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/payment/get/${user_data.id}`);
        const paymentMethod = response.data.find(method => method._id === id); // Find the method with the specific ID

        if (paymentMethod) {
          setCardName(paymentMethod.cardName);
          setCardNumber(paymentMethod.cardNumber);
          setExpiryDate(paymentMethod.expiryDate);
          setCvv(paymentMethod.cvv);
        } else {
          console.error('Payment method not found');
        }
      } catch (error) {
        console.error('Error fetching payment method:', error);
      }
    };

    fetchPaymentMethod();
  }, [user_data, id]);

  const validateForm = () => {
    const newErrors = {};
    const cardNameRegex = /^[A-Za-z\s]+$/; // Regex for letters and spaces
    const cardNumberRegex = /^\d{12}$/; // Regex for exactly 12 digits
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    const cvvRegex = /^\d{3}$/; // Regex for exactly 3 digits

    if (!cardNameRegex.test(cardName)) {
      newErrors.cardName = 'Card name should contain only letters and spaces.';
    }
    if (!cardNumberRegex.test(cardNumber)) {
      newErrors.cardNumber = 'Card number should be exactly 12 digits.';
    }
    if (!expiryDateRegex.test(expiryDate)) {
      newErrors.expiryDate = 'Expiry date should be in MM/YY format.';
    }
    if (!cvvRegex.test(cvv)) {
      newErrors.cvv = 'CVV should be exactly 3 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      const updatedPayment = {
        cardName,
        cardNumber,
        expiryDate,
        cvv,
      };

      try {
        const response = await axios.put(`http://localhost:5000/payment/update/${id}`, updatedPayment, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          console.log('Payment Method updated:', response.data);
          navigate('/index/saved'); // Navigate to the Saved component after successful update
        } else {
          console.error('Failed to update payment method:', response.statusText);
        }
      } catch (error) {
        console.error('Error occurred while updating payment method:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="update-payment-method">
      <div className="form-container">
        <h3>Update Payment Method</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardName">Card Name</label>
            <input
              type="text"
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
            {errors.cardName && <div className="error-message">{errors.cardName}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              placeholder="MM/YY"
            />
            {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
            {errors.cvv && <div className="error-message">{errors.cvv}</div>}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Card'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;