import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Button, Typography, TextField, Select, MenuItem } from '@material-ui/core';

const SchoolDetails = () => {
  const { id } = useParams();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newInvoice, setNewInvoice] = useState({
    item: '',
    dueDate: '',
    amount: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/schools/${id}`)
      .then(response => {
        setSchool(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching school details:', error);
        setError('Failed to load school details');
        setLoading(false);
      });
  }, [id]);

  const handleDeleteInvoice = (invoiceId) => {
    axios.delete(`http://localhost:3001/schools/${id}/invoices/${invoiceId}`)
      .then(response => {
        setSchool({
          ...school,
          invoices: school.invoices.filter(invoice => invoice.id !== invoiceId)
        });
      })
      .catch(error => console.error('Error deleting invoice:', error));
  };

  const handleAddInvoice = () => {
    const newInvoiceNumber = `INV${Date.now()}`;
    const invoiceToAdd = { ...newInvoice, invoiceNumber: newInvoiceNumber, status: 'Pending', paidAmount: 0, balance: newInvoice.amount, creationDate: new Date().toISOString().split('T')[0] };
    axios.post(`http://localhost:3001/schools/${id}/invoices`, invoiceToAdd)
      .then(response => {
        setSchool({
          ...school,
          invoices: [...school.invoices, response.data]
        });
        setNewInvoice({ item: '', dueDate: '', amount: '' });
      })
      .catch(error => console.error('Error adding invoice:', error));
  };

  const handleDeleteCollection = (collectionId) => {
    axios.delete(`http://localhost:3001/schools/${id}/collections/${collectionId}`)
      .then(response => {
        setSchool({
          ...school,
          collections: school.collections.filter(collection => collection.id !== collectionId)
        });
      })
      .catch(error => console.error('Error deleting collection:', error));
  };

  const handleUpdateCollectionStatus = (collectionId, status) => {
    axios.put(`http://localhost:3001/schools/${id}/collections/${collectionId}`, { status })
      .then(response => {
        setSchool({
          ...school,
          collections: school.collections.map(collection => collection.id === collectionId ? { ...collection, status } : collection)
        });
      })
      .catch(error => console.error('Error updating collection status:', error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!school) {
    return <div>No school data found.</div>;
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
        <div style={{ padding: '20px' }}>
          <Typography variant="h6">Add New Invoice</Typography>
          <TextField label="Item" value={newInvoice.item} onChange={(e) => setNewInvoice({ ...newInvoice, item: e.target.value })} />
          <TextField label="Due Date" type="date" value={newInvoice.dueDate} onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })} InputLabelProps={{ shrink: true }} />
          <TextField label="Amount" type="number" value={newInvoice.amount} onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })} />
          <Button onClick={handleAddInvoice}>Add Invoice</Button>
        </div>
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
                <TableCell>
                  <Select
                    value={collection.status}
                    onChange={(e) => handleUpdateCollectionStatus(collection.id, e.target.value)}
                  >
                    <MenuItem value="Valid">Valid</MenuItem>
                    <MenuItem value="Bounced">Bounced</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{collection.amount}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/schools/${id}/collections/${collection.id}`}>Edit</Button>
                  <Button onClick={() => handleDeleteCollection(collection.id)}>Delete</Button>
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
