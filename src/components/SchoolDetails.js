import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Button, Typography } from '@material-ui/core';

const SchoolDetails = () => {
  const { id } = useParams();
  const [school, setSchool] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/schools/${id}`)
      .then(response => setSchool(response.data))
      .catch(error => console.error('Error fetching school details:', error));
  }, [id]);

  const handleDeleteInvoice = (invoiceId) => {
    axios.delete(`http://localhost:3001/schools/${id}/invoices/${invoiceId}`)
      .then(response => {
        // Update state or show a success message
        setSchool({
          ...school,
          invoices: school.invoices.filter(invoice => invoice.id !== invoiceId)
        });
      })
      .catch(error => console.error('Error deleting invoice:', error));
  };

  if (!school) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h4">{school.name}</Typography>
      <Typography variant="subtitle1">Type: {school.type}</Typography>
      <Typography variant="subtitle1">Product: {school.product}</Typography>
      <Typography variant="subtitle1">County: {school.county}</Typography>
      <Typography variant="subtitle1">Registration Date: {school.registrationDate}</Typography>
      <Typography variant="subtitle1">Contact: {school.contact}</Typography>
      <Typography variant="subtitle1">Balance: {school.balance}</Typography>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Typography variant="h6" style={{ padding: '10px' }}>Invoices</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Paid Amount</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Days Until Due</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {school.invoices.map(invoice => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.item}</TableCell>
                <TableCell>{invoice.creationDate}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.paidAmount}</TableCell>
                <TableCell>{invoice.balance}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.daysUntilDue}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/schools/${id}/invoices/${invoice.id}`}>Edit</Button>
                  <Button onClick={() => handleDeleteInvoice(invoice.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Typography variant="h6" style={{ padding: '10px' }}>Collections</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Collection Number</TableCell>
              <TableCell>Date of Collection</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {school.collections.map(collection => (
              <TableRow key={collection.id}>
                <TableCell>{collection.invoiceNumber}</TableCell>
                <TableCell>{collection.collectionNumber}</TableCell>
                <TableCell>{collection.dateOfCollection}</TableCell>
                <TableCell>{collection.status}</TableCell>
                <TableCell>{collection.amount}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/schools/${id}/collections/${collection.id}`}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SchoolDetails;
