import React, { useState, useEffect, useContext } from 'react';
import './orderhistory.css';
import { UserContext } from './Userdata';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user_data } = useContext(UserContext);

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/getyours/${user_data.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Cancel an order
  const cancelOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/orders/delete/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  useEffect(() => {
    if (user_data && user_data.id) {
      fetchOrders();
    }
  }, [user_data]);

  return (
    <div className="order-history-container">
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <h4>Your don't have any orders.Please order something..</h4>
      ) : (
        
      orders.map(order => (
        <div className="order-box" key={order._id}>
          <div className="order-info">
            <img src={order.items[0].image} alt={order.name} className="order-image"/>
            <div>
              <h2 className="order-details">Order #{order._id}</h2>
              <p className="order-text">Qty: {order.items[0].quantity}</p>
              <p className="order-text">Status: {order.status}</p>
              <p className="order-text">Address: {order.address}</p>
              <p className="order-text">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="order-text">Total: Rs. {order.items[0].totalPrice}</p>
            </div>
          </div>
          <div className="order-summary-container">
            <button className="cancel-button" onClick={() => cancelOrder(order._id)}>Cancel Order</button>
          </div>
        </div>
      ))
      )}
      
    </div>
  );
};

export default Orders;
