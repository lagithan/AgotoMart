import React, { useState, useEffect } from 'react';
import './orderhistory.css';
import Footer from './Footer copy';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Fetch orders from the backend
    fetch('http://localhost:5000/api/orders') // Assuming your backend is running on localhost:5000
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'toReceive') return order.status === 'To be received';
    return true;
  });

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      <div className="tabs">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('toReceive')}>To Receive</button>
      </div>
      {filteredOrders.map(order => (
        <div className="order-card" key={order.id}>
          <div className="order-details">
            <img src={order.image} alt={order.name} />
            <div>
              <h2>Order #{order.id}</h2>
              <p><strong>{order.name}</strong></p>
              <p>Qty: {order.quantity}</p>
              <p>Status: {order.status}</p>
              <p>Address: {order.address}</p>
            </div>
          </div>
          <div className="order-summary">
            <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
            <p>Subtotal: Rs. {order.subTotal.toFixed(2)}</p>
            <p>Delivery fee: Rs. {order.deliveryFee.toFixed(2)}</p>
            <p>Total: Rs. {order.total.toFixed(2)}</p>
            <button className="cancel-order-button">Cancel order</button>
          </div>
        </div>
      ))}
      <Footer/>
    </div>
  );
};

export default Orders;
