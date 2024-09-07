import React, { useState, useEffect } from 'react';
import './order.css';
import { MenuItem, Select, Button } from '@mui/material';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders/all');
        console.log('Fetched orders:', response.data); // Log response data
        setOrders(response.data);
        setFilteredOrders(response.data); // Initialize filtered orders with fetched data
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    let updatedOrders = orders;
    
    // Apply status filter
    if (statusFilter !== 'All') {
      updatedOrders = updatedOrders.filter(order => order.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      updatedOrders = updatedOrders.filter(order => order._id.includes(searchTerm));
    }

    setFilteredOrders(updatedOrders);
  }, [orders, statusFilter, searchTerm]);

  const handleStatusChange = (event, index) => {
    const newOrders = [...orders];
    newOrders[index].status = event.target.value;
    setOrders(newOrders);
  };

  const handleUpdate = async (orderId, index) => {
    try {
      const updatedOrder = { status: orders[index].status };
      await axios.put(`http://localhost:5000/orders/update/${orderId}`, updatedOrder);
      console.log(`Order ID: ${orderId}, Updated Status: ${orders[index].status}`);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="container-order-history">
      <div className="tab-status-filters">
        <button
          className={`filter-tab ${statusFilter === 'All' ? 'active' : ''}`}
          onClick={() => setStatusFilter('All')}
        >
          All
        </button>
        <button
          className={`filter-tab ${statusFilter === 'Shipped' ? 'active' : ''}`}
          onClick={() => setStatusFilter('Shipped')}
        >
          Shipped
        </button>
        <button
          className={`filter-tab ${statusFilter === 'To be received' ? 'active' : ''}`}
          onClick={() => setStatusFilter('To be received')}
        >
          To be received
        </button>
        <button
          className={`filter-tab ${statusFilter === 'Received' ? 'active' : ''}`}
          onClick={() => setStatusFilter('Received')}
        >
          Received
        </button>
      </div>
      <div className="input-search-bar">
        <input
          type="text"
          placeholder="Search by orderID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredOrders.map((order, index) => (
        <div key={index} className="card-order">
          <img src={order.items[0].image} alt={order.name} className="order-image" />
          <div className="details-order">
            <div className="id-order">Order #{order._id}</div>
            {order.items.map((item, idx) => (
              <div key={idx} className="details-item">
                <span>{item.name}</span>
                <span>Qty: {item.quantity}</span>
                <span>Rs. {item.unitPrice.toFixed(2)}</span>
              </div>
            ))}
            <div className="amount-total">Total: Rs. {order.totalAmount.toFixed(2)}</div>
            <div className="section-status">
              <label>Status:</label>
              <Select
                value={order.status || 'Processing'} // Ensure default value if status is undefined
                onChange={(event) => handleStatusChange(event, index)}
                className="select-status"
                sx={{ color: 'black' }}
              >
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="To be received">To be received</MenuItem>
                <MenuItem value="Received">Received</MenuItem>
              </Select>
            </div>
          </div>
          <div className="actions-order">
            <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
            <Button
              variant="contained"
              className="button-updateadmin-order"
              onClick={() => handleUpdate(order._id, index)}
            >
              Update
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
