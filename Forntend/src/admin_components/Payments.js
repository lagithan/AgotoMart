import React, { useState, useEffect } from 'react';
import './payments.css'; // Assuming you'll have a CSS file for styling

const Payments = () => {
  const [paymentRecords, setPaymentRecords] = useState([]);

  useEffect(() => {
    // Example: Fetching payment records from a source (could be an API or local storage)
    const fetchedPaymentRecords = [
      { id: 1, cardNumber: '**** **** 4567', name: 'Siva', expiryDate: '05/27', amount: '$100', date: '2023-08-23' },
      { id: 2, cardNumber: '**** **** 1234', name: 'Labour', expiryDate: '04/24', amount: '$200', date: '2023-08-22' },
      // Add more payment records as needed
    ];
    setPaymentRecords(fetchedPaymentRecords);
  }, []);

  return (
    <div className="payments-container">
      <h2>Payment Records</h2>
      <table className="payments-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Card Number</th>
            <th>Name</th>
            <th>Expiry Date</th>
            <th>Amount Paid</th>
            <th>Date of Payment</th>
          </tr>
        </thead>
        <tbody>
          {paymentRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.cardNumber}</td>
              <td>{record.name}</td>
              <td>{record.expiryDate}</td>
              <td>{record.amount}</td>
              <td>{record.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;