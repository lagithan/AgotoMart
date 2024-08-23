import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './addpaymentmethods.css'; // Import the CSS file

const AddPaymentMethod = () => {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({}); // State for storing error messages

  const navigate = useNavigate(); // Initialize useNavigate

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
      // Create an object with the form data
      const paymentMethod = {
        cardName: cardName,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv
      };

      // Handle the storage or processing of the paymentMethod object
      console.log('Payment Method:', paymentMethod);

      // Optionally, clear the form after submission
      setCardName('');
      setCardNumber('');
      setExpiryDate('');
      setCvv('');

      // Navigate to the Saved component after form submission
      navigate('/index/saved'); // Replace '/saved' with the actual route to the Saved component
    }
  };

  return (
    <div className="payment-method-box">
      <h3>Add Payment Method</h3>
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
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default AddPaymentMethod;