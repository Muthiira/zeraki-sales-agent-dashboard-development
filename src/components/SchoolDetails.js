import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Button, Typography, TextField, Select, MenuItem } from '@material-ui/core';

const SchoolDetails = () => {
  const { id } = useParams();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newInvoice, setNewInvoice] = useState({ item: '', dueDate: '', amount: '' });
  const [editInvoice, setEditInvoice] = useState(null);
  const [newCollection, setNewCollection] = useState({ invoiceNumber: '', amount: '' });

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
    axios.delete(`http://localhost:3001/invoices/${invoiceId}`)
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
    axios.post(`http://localhost:3001/invoices`, { ...invoiceToAdd, schoolId: id })
      .then(response => {
        setSchool({
          ...school,
          invoices: [...school.invoices, response.data]
        });
        setNewInvoice({ item: '', dueDate: '', amount: '' });
      })
      .catch(error => console.error('Error adding invoice:', error));
  };

  const handleUpdateInvoice = () => {
    axios.put(`http://localhost:3001/invoices/${editInvoice.id}`, editInvoice)
      .then(response => {
        setSchool({
          ...school,
          invoices: school.invoices.map(invoice => invoice.id === editInvoice.id ? response.data : invoice)
        });
        setEditInvoice(null);
      })
      .catch(error => console.error('Error updating invoice:', error));
  };

  const handleDeleteCollection = (collectionId) => {
    axios.delete(`http://localhost:3001/collections/${collectionId}`)
      .then(response => {
        setSchool({
          ...school,
          collections: school.collections.filter(collection => collection.id !== collectionId)
        });
      })
      .catch(error => console.error('Error deleting collection:', error));
  };

  const handleUpdateCollectionStatus = (collectionId, status) => {
    axios.put(`http://localhost:3001/collections/${collectionId}`, { status })
      .then(response => {
        const updatedCollection = school.collections.find(collection => collection.id === collectionId);
        const invoiceToUpdate = school.invoices.find(invoice => invoice.invoiceNumber === updatedCollection.invoiceNumber);

        let updatedStatus = 'Pending';
        if (status === 'Bounced') {
          updatedStatus = 'Incomplete';
        } else if (invoiceToUpdate.paidAmount >= invoiceToUpdate.amount) {
          updatedStatus = 'Completed';
        }

        axios.put(`http://localhost:3001/invoices/${invoiceToUpdate.id}`, { status: updatedStatus })
          .then(invoiceResponse => {
            setSchool({
              ...school,
              collections: school.collections.map(collection => collection.id === collectionId ? { ...collection, status } : collection),
              invoices: school.invoices.map(invoice => invoice.id === invoiceToUpdate.id ? { ...invoice, status: updatedStatus } : invoice)
            });
          })
          .catch(invoiceError => console.error('Error updating invoice status:', invoiceError));
      })
      .catch(error => console.error('Error updating collection status:', error));
  };

  const handleAddCollection = () => {
    const collectionToAdd = { ...newCollection, collectionNumber: `COL${Date.now()}`, dateOfCollection: new Date().toISOString().split('T')[0], status: 'Valid' };
    axios.post(`http://localhost:3001/collections`, { ...collectionToAdd, schoolId: id })
      .then(response => {
        const invoiceToUpdate = school.invoices.find(invoice => invoice.invoiceNumber === newCollection.invoiceNumber);
        const updatedPaidAmount = parseFloat(invoiceToUpdate.paidAmount) + parseFloat(newCollection.amount);
        const updatedBalance = parseFloat(invoiceToUpdate.amount) - updatedPaidAmount;

        let updatedStatus = 'Pending';
        if (updatedPaidAmount >= invoiceToUpdate.amount) {
          updatedStatus = 'Completed';
        }

        axios.put(`http://localhost:3001/invoices/${invoiceToUpdate.id}`, { paidAmount: updatedPaidAmount, balance: updatedBalance, status: updatedStatus })
          .then(invoiceResponse => {
            setSchool({
              ...school,
              collections: [...school.collections, response.data],
              invoices: school.invoices.map(invoice => invoice.id === invoiceToUpdate.id ? { ...invoice, paidAmount: updatedPaidAmount, balance: updatedBalance, status: updatedStatus } : invoice)
            });
            setNewCollection({ invoiceNumber: '', amount: '' });
          })
          .catch(invoiceError => console.error('Error updating invoice:', invoiceError));
      })
      .catch(error => console.error('Error adding collection:', error));
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
      <div className="school-details-header">
        <Typography variant="h4">{school.name}</Typography>
      </div>
	  <div className="school-details-container">
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
                <TableCell>{Math.ceil((new Date(invoice.dueDate) - new Date()) / (1000 * 60 * 60 * 24))}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteInvoice(invoice.id)}>Delete</Button>
                  <Button onClick={() => setEditInvoice(invoice)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
            {editInvoice && (
              <TableRow>
                <TableCell>{editInvoice.invoiceNumber}</TableCell>
                <TableCell>
                  <Select value={editInvoice.item} onChange={e => setEditInvoice({ ...editInvoice, item: e.target.value })}>
                    <MenuItem value="Zeraki Analytics">Zeraki Analytics</MenuItem>
                    <MenuItem value="Zeraki Finance">Zeraki Finance</MenuItem>
                    <MenuItem value="Zeraki Timetable">Zeraki Timetable</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{editInvoice.creationDate}</TableCell>
                <TableCell>
                  <TextField type="date" value={editInvoice.dueDate} onChange={e => setEditInvoice({ ...editInvoice, dueDate: e.target.value })} />
                </TableCell>
                <TableCell>
                  <TextField type="number" value={editInvoice.amount} onChange={e => setEditInvoice({ ...editInvoice, amount: e.target.value })} />
                </TableCell>
                <TableCell>{editInvoice.paidAmount}</TableCell>
                <TableCell>{editInvoice.balance}</TableCell>
                <TableCell>{editInvoice.status}</TableCell>
                <TableCell>{Math.ceil((new Date(editInvoice.dueDate) - new Date()) / (1000 * 60 * 60 * 24))}</TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdateInvoice()}>Save</Button>
                  <Button onClick={() => setEditInvoice(null)}>Cancel</Button>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>New</TableCell>
              <TableCell>
                <Select value={newInvoice.item} onChange={e => setNewInvoice({ ...newInvoice, item: e.target.value })}>
                  <MenuItem value="Zeraki Analytics">Zeraki Analytics</MenuItem>
                  <MenuItem value="Zeraki Finance">Zeraki Finance</MenuItem>
                  <MenuItem value="Zeraki Timetable">Zeraki Timetable</MenuItem>
                </Select>
              </TableCell>
              <TableCell>{new Date().toISOString().split('T')[0]}</TableCell>
              <TableCell>
                <TextField type="date" value={newInvoice.dueDate} onChange={e => setNewInvoice({ ...newInvoice, dueDate: e.target.value })} />
              </TableCell>
              <TableCell>
                <TextField type="number" value={newInvoice.amount} onChange={e => setNewInvoice({ ...newInvoice, amount: e.target.value })} />
              </TableCell>
              <TableCell>0</TableCell>
              <TableCell>{newInvoice.amount}</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>
                <Button onClick={() => handleAddInvoice()}>Add</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Typography variant="h6" style={{ padding: '10px' }}>Collections</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Collection Number</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Date of Collection</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {school.collections.map(collection => (
              <TableRow key={collection.id}>
                <TableCell>{collection.collectionNumber}</TableCell>
                <TableCell>{collection.invoiceNumber}</TableCell>
                <TableCell>{collection.dateOfCollection}</TableCell>
                <TableCell>{collection.amount}</TableCell>
                <TableCell>
                  <Select value={collection.status} onChange={e => handleUpdateCollectionStatus(collection.id, e.target.value)}>
                    <MenuItem value="Valid">Valid</MenuItem>
                    <MenuItem value="Bounced">Bounced</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteCollection(collection.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>New</TableCell>
              <TableCell>
                <TextField value={newCollection.invoiceNumber} onChange={e => setNewCollection({ ...newCollection, invoiceNumber: e.target.value })} />
              </TableCell>
              <TableCell>{new Date().toISOString().split('T')[0]}</TableCell>
              <TableCell>
                <TextField type="number" value={newCollection.amount} onChange={e => setNewCollection({ ...newCollection, amount: e.target.value })} />
              </TableCell>
              <TableCell>Valid</TableCell>
              <TableCell>
                <Button onClick={() => handleAddCollection()}>Add</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
	  </div>
    </div>
  );
};

export default SchoolDetails;
