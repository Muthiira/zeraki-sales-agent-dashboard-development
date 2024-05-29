import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpcomingInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/upcomingInvoices')
      .then(response => setInvoices(response.data))
      .catch(error => console.error('Error fetching upcoming invoices:', error));
  }, []);

  const handleCollectPayment = (invoiceId) => {
  };

  return (
    <div>
      <h2>Upcoming Invoices</h2>
      <ul>
        {invoices.map(invoice => (
          <li key={invoice.id}>
            {invoice.schoolName} - Due: {invoice.dueDate} - Amount: {invoice.amountDue}
            <button onClick={() => handleCollectPayment(invoice.id)}>Collect Payment</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingInvoices;
