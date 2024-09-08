import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './orderform.css';
import { UserContext } from './Userdata';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
  const location = useLocation();
  const { selectedItem } = location.state || {};
  const { user_data,isregistered } = useContext(UserContext);
  const [address, setaddress] = useState([]);
  const navigate = useNavigate();

  const fetchaddress = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/userprofile/getaddress/${user_data.id}`);
      const addressdata = response.data;

      const fullAddress = [
        addressdata.address1,
        addressdata.address2,
      ].filter(Boolean).join(', ');

      setaddress([fullAddress, addressdata.address3]);
    } catch (error) {
      console.error("Error occurred");
    }
  };

  useEffect(() => {
    fetchaddress();
  }, []);

  // Initial form data
  const [formData, setFormData] = useState({
    user_id: user_data.id,
    Name: user_data.name,
    phoneNumber: user_data.phonenumber || '',
    district: '',
    addressLine: '',
    paymentMethod: '',
    termsAccepted: false,
    items: [
      {
        name: selectedItem?.name || '',
        image: selectedItem?.image.url || '',
        unitPrice: selectedItem?.price || 0,
        quantity: selectedItem?.quantity || 0,
        totalPrice: (selectedItem?.price || 0) * (selectedItem?.quantity || 0),
      }
    ],
  });
    //because this works asynchronusly
  useEffect(() => {
    if (address.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        district: String(address[1]) || '',
        addressLine: String(address[0]) || '',
      }));
    }
  }, [address]);

  useEffect(() => {
    if (selectedItem) {
      setFormData(prevData => ({
        ...prevData,
        items: [
          {
            name: selectedItem.name,
            image: selectedItem.image.url,
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

    if(isregistered){
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }

    if (formData.paymentMethod === "cashOnDelivery") {
      try {
        console.log(formData)
        const response = await axios.post('http://localhost:5000/orders/place', formData);
        if (response.status === 201) {
          alert('Order placed successfully!');
          navigate('/index');
        }
      } catch (error) {
        console.error('Error placing order:', error);
        alert('An error occurred. Please try again.');
      }
    } else if (formData.paymentMethod === "payhere") {
      const totalprice = formData.items[0].totalPrice;
      navigate('/paymentform', { state: { totalprice, formdata: formData } });
    }}

    else{
      alert("Login your account first");
      navigate('/login')
    }
  };

  return (
    <div className="payment-billing-wrapper">
      <h2 className="payment-billing-heading">Payment & Billing</h2>
      <div className="content-wrapper">
        <div className="billing-section">
          <h3>Billing Details</h3>
          <form onSubmit={handleSubmit}>
            <p>Name</p>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your name"
              value={formData.Name}
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
              name="addressLine"
              placeholder="Enter your address"
              value={formData.addressLine}
              onChange={handleChange}
              required
            />
          </form>
        </div>
        <div className="order-summary-section">
          <div className="order-items-wrapper">
            {formData.items.map((item, index) => (
              <div key={index} className="order-item-wrapper">
                <img src={item.image || 'default-image-url'} alt="Product" />
                <div className="order-details-text">
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Unit Price:</strong> Rs. {item.unitPrice}.00</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Total Price:</strong> Rs. {item.totalPrice}.00</p>
                </div>
              </div>
            ))}
          </div>
          <p className="total-value"><strong>Total:</strong> Rs. {formData.items.reduce((acc, item) => acc + item.totalPrice, 0)}.00</p>
          <div className="payment-options-wrapper">
            <div>
              <input
                type="radio"
                id="payhere"
                name="paymentMethod"
                value="payhere"
                checked={formData.paymentMethod === 'payhere'}
                onChange={handleChange}
              />
              <label htmlFor="payhere">Card Payment</label>
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

          <div className="terms-checkbox-wrapper">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
              Accept terms and conditions</label>
          </div>
          <button className="pay-now-button" onClick={handleSubmit}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
