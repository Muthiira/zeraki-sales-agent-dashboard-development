import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Button } from '@material-ui/core';

const Schools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/schools')
      .then(response => setSchools(response.data))
      .catch(error => console.error('Error fetching schools:', error));
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleDeleteInvoice = (schoolId, invoiceId) => {
    axios.delete(`http://localhost:3001/schools/${schoolId}/invoices/${invoiceId}`)
      .then(response => {
        // Update state or show a success message
      })
      .catch(error => console.error('Error deleting invoice:', error));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>County</TableCell>
            <TableCell>Registration Date</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Actions</TableCell>
            <TableCell>Collections</TableCell> {/* Added Collections column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {schools.map(school => (
            <TableRow key={school.id}>
              <TableCell>{school.name}</TableCell>
              <TableCell>{school.type}</TableCell>
              <TableCell>{school.product}</TableCell>
              <TableCell>{school.county}</TableCell>
              <TableCell>{school.registrationDate}</TableCell>
              <TableCell>{school.contact}</TableCell>
              <TableCell>{school.balance}</TableCell>
              <TableCell>
                <Button component={Link} to={`/schools/${school.id}`}>View Details</Button>
              </TableCell>
              <TableCell>
                {/* Add a link or button to view collections */}
                <Button component={Link} to={`/schools/${school.id}/collections`}>View Collections</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Schools;
