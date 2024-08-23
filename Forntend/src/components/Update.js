import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams hooks
import './update.css'; // Import the CSS file

const Update = () => {
  const { index } = useParams(); // Get the index from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  
  // Initialize state with default values
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({}); // State for storing error messages

  useEffect(() => {
    // Retrieve the payment method details based on the index
    const paymentMethods = [
      { cardNumber: '**** **** 4567', name: 'Siva', expiryDate: '5/27/15' },
      { cardNumber: 'Customer', name: 'Labour', expiryDate: '5/19/12' },
      { cardNumber: 'Customer', name: 'Family', expiryDate: '3/4/16' },
      { cardNumber: 'Customer', name: 'Direct', expiryDate: '3/4/16' },
      { cardNumber: 'Customer', name: 'Criminal', expiryDate: '7/27/13' },
      { cardNumber: 'Customer', name: 'Election', expiryDate: '5/27/15' },
      { cardNumber: 'Customer', name: 'Indirect T', expiryDate: '7/11/19' },
    ];

    // Load the payment method details based on the index
    const paymentMethod = paymentMethods[index];
    
    if (paymentMethod) {
      setCardName(paymentMethod.name);
      setCardNumber(paymentMethod.cardNumber);
      setExpiryDate(paymentMethod.expiryDate);
      setCvv(''); // CVV is not included in paymentMethods array, but set it if required
    }
  }, [index]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Create an object with the updated form data
      const updatedPaymentMethod = {
        cardName,
        cardNumber,
        expiryDate,
        cvv
      };

      // Log the updated payment method
      console.log('Updated Payment Method:', updatedPaymentMethod);

      // Optionally, navigate back to the saved payment methods list
      navigate('/index/saved'); // Replace '/index/saved' with the actual route to the SavedPaymentMethods component
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
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Update;