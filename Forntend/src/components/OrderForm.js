import React, { useState } from 'react';
import './orderform.css';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    district: '',
    address: '',
    paymentMethod: '',
    termsAccepted: false,
    items: [
      { name: 'Gotukola', unitPrice: 100, quantity: 2, totalPrice: 200 },
      { name: 'Gotukola', unitPrice: 100, quantity: 2, totalPrice: 200 },
      { name: 'Gotukola', unitPrice: 100, quantity: 2, totalPrice: 200 },
      { name: 'Gotukola', unitPrice: 100, quantity: 2, totalPrice: 200 }
    ]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }

    try {
      const response = await fetch('https://your-api-endpoint.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        setFormData({
          ...formData,
          firstName: '',
          lastName: '',
          phoneNumber: '',
          district: '',
          address: '',
          paymentMethod: '',
          termsAccepted: false,
        });
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="payment-billing-container">
      <h2>Payment & Billing</h2>
      <div className="content-container">
        <div className="billing-details">
          <h3>Billing Details</h3>
          <form onSubmit={handleSubmit}>
            <p>First Name</p>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <p>Last Name</p>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <p>Phone Number</p>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <p>Your District</p>
            <input
              type="text"
              name="district"
              placeholder="Enter your district"
              value={formData.district}
              onChange={handleChange}
              required
            />
            <p>Your Address</p>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </form>
        </div>
        <div className="order-summary">
          <div className="order-items-container">
            {formData.items.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.image} alt="Product" />
                <div className='text-arrange'>
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Unit Price:</strong> Rs. {item.unitPrice}.00</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Total Price:</strong> Rs. {item.totalPrice}.00</p>
                </div>
              </div>
            ))}
          </div>
          <p className='Totalvalue'><strong>Total:</strong> Rs. {formData.items.reduce((acc, item) => acc + item.totalPrice, 0)}.00</p>
          <div className="payment-options">
            <div>
              <input
                type="radio"
                id="payhere"
                name="paymentMethod"
                value="payhere"
                checked={formData.paymentMethod === 'payhere'}
                onChange={handleChange}
              />
              <label htmlFor="payhere">Pay here</label>
            </div>
            <div>
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="creditCard"
                checked={formData.paymentMethod === 'creditCard'}
                onChange={handleChange}
              />
              <label htmlFor="creditCard">Credit Card</label>
            </div>
          </div>
          <p className="disclaimer">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
          <div className="terms">
            <input
              type="checkbox"
              id="agree"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label htmlFor="agree">I have read and agree to the website terms and conditions.</label>
          </div>
          <button className="pay-button" type="submit" onClick={handleSubmit}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
