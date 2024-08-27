/* import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './orderform.css';

const OrderForm = () => {
  const location = useLocation();
  const { selectedItem, selectedQuantity } = location.state || {};
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    district: '',
    address: '',
    paymentMethod: '',
    termsAccepted: false,
    items: [
      {
        name: selectedItem ? selectedItem.name : '',
        unitPrice: selectedItem ? selectedItem.price : 0,
        quantity: selectedQuantity || 0,
        totalPrice: selectedItem ? selectedItem.price * selectedQuantity : 0,
      }
    ],
  });

  useEffect(() => {
    if (selectedItem && selectedQuantity) {
      setFormData(prevData => ({
        ...prevData,
        items: [
          {
            name: selectedItem.name,
            unitPrice: selectedItem.price,
            quantity: selectedQuantity,
            totalPrice: selectedItem.price * selectedQuantity,
          }
        ]
      }));
    }
  }, [selectedItem, selectedQuantity]);

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
          items: [],
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
                <img src={selectedItem.image.url} alt="Product" />
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
                id="cashOnDelivery"
                name="paymentMethod"
                value="cashOnDelivery"
                checked={formData.paymentMethod === 'cashOnDelivery'}
                onChange={handleChange}
              />
              <label htmlFor="cashOnDelivery">Cash on Delivery</label>
            </div>
          </div>
          <div className="terms-checkbox">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label>Accept terms and conditions</label>
          </div>
          <button className="paynow-btn" onClick={handleSubmit}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
 */

/* import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './orderform.css';

const OrderForm = () => {
  const location = useLocation();
  const { selectedItem, selectedQuantity } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    district: '',
    address: '',
    paymentMethod: '',
    termsAccepted: false,
    items: [
      {
        name: selectedItem?.name || '',
        unitPrice: selectedItem?.price || 0,
        quantity: selectedQuantity || 0,
        totalPrice: (selectedItem?.price || 0) * (selectedQuantity || 0),
      }
    ],
  });

  useEffect(() => {
    if (selectedItem && selectedQuantity) {
      setFormData(prevData => ({
        ...prevData,
        items: [
          {
            name: selectedItem.name,
            unitPrice: selectedItem.price,
            quantity: selectedQuantity,
            totalPrice: selectedItem.price * selectedQuantity,
          }
        ]
      }));
    }
  }, [selectedItem, selectedQuantity]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the form data is valid
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }

    // Log the form data for debugging
    console.log('Submitting order with the following data:', formData);

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
        // Reset the form data
        setFormData({
          ...formData,
          firstName: '',
          lastName: '',
          phoneNumber: '',
          district: '',
          address: '',
          paymentMethod: '',
          termsAccepted: false,
          items: [
            {
              name: '',
              unitPrice: 0,
              quantity: 0,
              totalPrice: 0,
            },
          ],
        });
      } else {
        const errorResponse = await response.json();
        alert(`Failed to place order: ${errorResponse.message || 'Unknown error'}`);
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
                <img src={selectedItem?.image?.url || 'default-image-url'} alt="Product" />
                <div className="text-arrange">
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Unit Price:</strong> Rs. {item.unitPrice}.00</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Total Price:</strong> Rs. {item.totalPrice}.00</p>
                </div>
              </div>
            ))}
          </div>
          <p className="Totalvalue"><strong>Total:</strong> Rs. {formData.items.reduce((acc, item) => acc + item.totalPrice, 0)}.00</p>
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
                id="cashOnDelivery"
                name="paymentMethod"
                value="cashOnDelivery"
                checked={formData.paymentMethod === 'cashOnDelivery'}
                onChange={handleChange}
              />
              <label htmlFor="cashOnDelivery">Cash on Delivery</label>
            </div>
          </div>
          <div className="terms-checkbox">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label>Accept terms and conditions</label>
          </div>
          <button className="paynow-btn" onClick={handleSubmit}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm; */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './orderform.css';

const OrderForm = () => {
  const location = useLocation();
  const { selectedItem } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    district: '',
    address: '',
    paymentMethod: '',
    termsAccepted: false,
    items: [
      {
        name: selectedItem?.name || '',
        unitPrice: selectedItem?.price || 0,
        quantity: selectedItem?.quantity || 0,
        totalPrice: (selectedItem?.price || 0) * (selectedItem?.quantity || 0),
      }
    ],
  });

  useEffect(() => {
    if (selectedItem) {
      setFormData(prevData => ({
        ...prevData,
        items: [
          {
            name: selectedItem.name,
            unitPrice: selectedItem.price,
            quantity: selectedItem.quantity,
            totalPrice: selectedItem.price * selectedItem.quantity,
          }
        ]
      }));
    }
  }, [selectedItem]);

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

    console.log(formData)

    try {
      const response = await axios.post('http://localhost:5000/orders/place', formData);
      if (response.status === 201) {
        alert('Order placed successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          district: '',
          address: '',
          paymentMethod: '',
          termsAccepted: false,
          items: []
        });
      } else {
        alert('Failed to place order.');
      }
    } 
   
  catch (error) {
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
              <img src={selectedItem?.image?.url || 'default-image-url'} alt="Product" />
              <div className="text-arrange">
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Unit Price:</strong> Rs. {item.unitPrice}.00</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Total Price:</strong> Rs. {item.totalPrice}.00</p>
              </div>
            </div>
          ))}
        </div>
        <p className="Totalvalue"><strong>Total:</strong> Rs. {formData.items.reduce((acc, item) => acc + item.totalPrice, 0)}.00</p>
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
              id="cashOnDelivery"
              name="paymentMethod"
              value="cashOnDelivery"
              checked={formData.paymentMethod === 'cashOnDelivery'}
              onChange={handleChange}
            />
            <label htmlFor="cashOnDelivery">Cash on Delivery</label>
          </div>
        </div>
        <div className="terms-checkbox">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
          />
          <label>Accept terms and conditions</label>
        </div>
        <button className="paynow-btn" onClick={handleSubmit}>Pay Now</button>

      </div>
    </div>
  </div>
);
};

export default OrderForm;

