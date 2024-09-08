import React, { useState, useEffect} from 'react';
import './payments.css';
import axios from 'axios';

const Payments = () => {
  const [paymentRecords, setPaymentRecords] = useState([]);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const paymetdata = await axios.get(`http://localhost:5000/payment/getpayment`);
        setPaymentRecords(paymetdata.data); 
      } catch (error) {
        console.log("Error occurred while fetching payment records", error);
      }
    };
    fetchPaymentData();
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
            <th>Amount Paid</th>
            <th>Date of Payment</th>
          </tr>
        </thead>
        <tbody>
          {paymentRecords.map((record) => (
            <tr key={record._id}>
              <td>{record._id}</td>
              <td>**** ****{record.cardnumber % 10000}</td>
              <td>{record.cardname}</td>
              <td>{record.totalamount}</td>
              <td>{new Date(record.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;