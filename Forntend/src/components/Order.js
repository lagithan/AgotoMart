import React, { useState, useEffect } from 'react';
import './orderhistory.css';

const Orders = () => {
  // Sample order data to test the UI
  const [orders, setOrders] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/100', // Placeholder image URL
      name: 'Gotukola',
      quantity: 2,
      status: 'To be received',
      address: '123, Main Street, Colombo',
      date: '2024-02-03T11:32:42',
      subTotal: 200.00,
      deliveryFee: 50.00,
      total: 250.00
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100', // Placeholder image URL
      name: 'Carrot',
      quantity: 5,
      status: 'Delivered',
      address: '456, Market Road, Kandy',
      date: '2024-02-01T09:15:22',
      subTotal: 500.00,
      deliveryFee: 50.00,
      total: 550.00
    }
  ]);

  const [filter, setFilter] = useState('all');

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
    </div>
  );
};

export default Orders;
