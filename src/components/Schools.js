import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Button, Typography } from '@material-ui/core';

const Schools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/schools')
      .then(response => setSchools(response.data))
      .catch(error => console.error('Error fetching schools:', error));
  }, []);

  return (
    <div>
      <div className="sales-section">
        <Typography variant="h4" gutterBottom style={{ margin: '20px 0', color: '#fff' }}>
          School Data
        </Typography>
      </div>
      <div className="school-container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
            <TableRow>
              <TableCell><b><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Name</Typography></b></TableCell>
              <TableCell><b><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Type</Typography></b></TableCell>
              <TableCell><b><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Product</Typography></b></TableCell>
              <TableCell><b><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>County</Typography></b></TableCell>
              <TableCell><b><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Registration Date</Typography></b></TableCell>
              <TableCell><b><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Contact</Typography></b></TableCell>
              <TableCell><b><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Balance</Typography></b></TableCell>
              <TableCell><b><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Actions</Typography></b></TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Schools;
