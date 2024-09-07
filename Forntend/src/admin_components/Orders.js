import React, { useState, useEffect } from 'react';
import './order.css';
import { MenuItem, Select, Button } from '@mui/material';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const response = [
        {
          orderId: '13234567',
          items: [
            { name: 'Gotukola', quantity: 2, price: 1000 },
            { name: 'Brinjal', quantity: 2, price: 1000 },
          ],
          total: 2000,
          status: 'To be received',
          placedOn: '03 February 2024 11.32.42',
        },
      ];
      setOrders(response);
      setSelectedStatus(response[0].status);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdate = (orderId) => {
    console.log(`Order ID: ${orderId}, Updated Status: ${selectedStatus}`);
  };

  return (
    <div className="order-history-container">
      <div className="status-tabs">
        <button className="tab">All</button>
        <button className="tab">Shipped</button>
        <button className="tab">To be received</button>
        <button className="tab">Received</button>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search by orderID" />
      </div>
      {orders.map((order, index) => (
        <div key={index} className="order-card">
          <div className="order-details">
            <div className="order-id">Order #{order.orderId}</div>
            {order.items.map((item, idx) => (
              <div key={idx} className="item-details">
                <span>{item.name}</span>
                <span>Qty:{item.quantity}</span>
                <span>Rs.{item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="total-amount">Total: Rs.{order.total.toFixed(2)}</div>
            <div className="status-section">
              <label>Status:</label>
              <Select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="status-select"
              >
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="To be received">To be received</MenuItem>
                <MenuItem value="Received">Received</MenuItem>
              </Select>
            </div>
          </div>
          <div className="order-actions">
            <p>Placed on {order.placedOn}</p>
            <Button variant="contained" className="update-button-last" onClick={() => handleUpdate(order.orderId)}>
              Update
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
