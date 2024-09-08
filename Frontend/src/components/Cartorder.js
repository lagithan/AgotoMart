import React, { useState,useContext,useEffect} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './cartorder.css';
import { UserContext } from './Userdata'; 


const Cartorder= () => {
  const { state } = useLocation();
  const { user_data } = useContext(UserContext);
  const [address, setaddress] = useState([]);
  const { cartItems } = state; 
  const [dataset,setdataset] = useState([]);
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
  
  const [userDetails, setUserDetails] = useState({
    user_id: user_data.id,
    Name: user_data.name,
    phoneNumber: user_data.phonenumber || '',
    district: '',
    addressLine: '',
    paymentMethod: '',
    termsAccepted: false,
    
  });

  useEffect(() => {
    if (address.length > 0) {
      setUserDetails((prevData) => ({
        ...prevData,
        district: String(address[1]) || '',
        addressLine: String(address[0]) || '',
      }));
    }
  }, [address]);
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userDetails.termsAccepted) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }

    if(userDetails.paymentMethod === "cashOnDelivery"){
    const dataset = cartItems.map((item)=>new Promise(async (resolve,reject)=>{
        try {
            const data = {...userDetails,items: [
                {
                  name: item.items.name,
                  image: item.items.image,
                  unitPrice: item.items.unitPrice,
                  quantity: item.items.quantity,
                  totalPrice: item.items.totalPrice,
                }
              ],}
            const response = await axios.post('http://localhost:5000/orders/place',data );
            alert("Order placed successfully");
            navigate('/index');

          } catch (error) {
            console.log(error);
            reject(error)
          }
    }))
    setdataset(dataset)
  }

  else if (userDetails.paymentMethod === "payhere"){
    const totalprice = cartItems.reduce((acc, item) => acc + item.items.totalPrice, 0)

    const dataset = cartItems.map((item) => {
      const data = {
        ...userDetails,
        items: [
          {
            name: item.items.name,
            image: item.items.image,
            unitPrice: item.items.unitPrice,
            quantity: item.items.quantity,
            totalPrice: item.items.totalPrice,
          }
        ]
      };
      return data; 
    });
    setdataset(dataset);
    console.log(dataset);
    navigate('/paymentform',{state:{
      formdata:dataset,
      totalprice,
    }});
  }
    
  };
  

      
  

  return (
    <div className="payment-billing-wrapper">
      <h2 className="payment-billing-heading">Order Form</h2>
      <div className="content-wrapper">
        <div className="billing-section">
          <h3>Billing Details</h3>
          <form onSubmit={handleSubmit}>
          <p>First Name</p>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your name"
              value={userDetails.Name}
              onChange={handleChange}
              required
            />
             <p>Phone</p>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={userDetails.phoneNumber}
              onChange={handleChange}
              required
            />
            <p>Your District</p>
            <input
              type="text"
              name="district"
              placeholder="Enter your district"
              value={userDetails.district}
              onChange={handleChange}
              required
            />
            <p>Address</p>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={userDetails.addressLine}
              onChange={handleChange}
              required
            />
            
          </form>
        </div>

        <div className="order-summary-section">
          <h3>Cart Summary</h3>
          <div className='order-sum'>
          <div className="order-items-wrapper">
            {cartItems.map((item) => (
              <div key={item._id} className="order-item-wrapper">
                <img src={item.items.image || 'default-image-url'} alt="Product" />
                <div className="order-details-text">
                  <p><strong>Name:</strong> {item.items.name}</p>
                  <p><strong>Quantity:</strong> {item.items.quantity}</p>
                  <p><strong>Price: Rs.</strong> {item.items.unitPrice}</p>
                  <p><strong>Total Price:</strong> Rs. {item.items.totalPrice}.00</p>
                </div>
              </div>
            ))}
          </div>
          </div>
          
          <p className="total-value">
            <strong>Total:</strong> Rs. {cartItems.reduce((acc, item) => acc + item.items.totalPrice, 0)}.00
          </p>
          <div className="payment-options-wrapper">
            <div>
              <input
                type="radio"
                id="payhere"
                name="paymentMethod"
                value="payhere"
                checked={userDetails.paymentMethod === 'payhere'}
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
                checked={userDetails.paymentMethod === 'cashOnDelivery'}
                onChange={handleChange}
              />
              <label htmlFor="cashOnDelivery">Cash on Delivery</label>
            </div>
          </div>
          
          <div className="terms-checkbox-wrapper">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={userDetails.termsAccepted}
              onChange={handleChange}
            />
            <label>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
            Accept terms and conditions</label>
            </div>
          <button className="placeorder-button" type="submit" onClick={handleSubmit}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );}
;

export default Cartorder;
