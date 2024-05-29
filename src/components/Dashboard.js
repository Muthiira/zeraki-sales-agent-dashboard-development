import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography, Grid, Button, Modal, TextField, Box } from '@material-ui/core';
import 'chart.js/auto';

const Dashboard = () => {
  const [collections, setCollections] = useState(0);
  const [signUps, setSignUps] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState({ overall: 0, analytics: 0, finance: 0, timetable: 0 });
  const [bouncedCheques, setBouncedCheques] = useState(0);
  const [signUpTargets, setSignUpTargets] = useState({
    analytics: { target: 100, achieved: 0 },
    finance: { target: 100, achieved: 0 },
    timetable: { target: 100, achieved: 0 },
  });
  const [signUpDistribution, setSignUpDistribution] = useState({
    analytics: { primary: 0, secondary: 0, igcse: 0 },
    finance: { primary: 0, secondary: 0, igcse: 0 },
    timetable: { primary: 0, secondary: 0, igcse: 0 },
  });
  const [upcomingInvoices, setUpcomingInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/metrics').then(response => {
      setCollections(response.data.collections);
      setSignUps(response.data.signUps);
      setTotalRevenue(response.data.totalRevenue);
      setBouncedCheques(response.data.bouncedCheques);
    }).catch(error => console.error('Error fetching metrics:', error));

    axios.get('http://localhost:3001/signupTargets').then(response => {
      setSignUpTargets(response.data);
    }).catch(error => console.error('Error fetching signup targets:', error));

    axios.get('http://localhost:3001/signupDistribution').then(response => {
      setSignUpDistribution(response.data);
    }).catch(error => console.error('Error fetching signup distribution:', error));

    axios.get('http://localhost:3001/upcomingInvoices').then(response => {
      setUpcomingInvoices(response.data);
    }).catch(error => console.error('Error fetching upcoming invoices:', error));
  }, []);

  const pieChartConfig = useCallback((data) => ({
    labels: ['Achieved', 'Target'],
    datasets: [{
      data: [data.achieved, data.target - data.achieved],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }],
  }), []);

  const barChartConfig = useCallback((data) => ({
    labels: ['Primary', 'Secondary', 'IGCSE'],
    datasets: [{
      label: 'Sign-ups',
      data: [data.primary, data.secondary, data.igcse],
      backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
    }],
  }), []);

  const chartOptions = useMemo(() => ({
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
  }), []);

  const handlePayment = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeModal = () => {
    setSelectedInvoice(null);
  };

  return (
    <div className="dashboard">
      <Grid container spacing={3}>
        <MetricCard title="Collections" value={collections} />
        <MetricCard title="Sign-ups" value={signUps} />
        <MetricCard title="Total Revenue" value={totalRevenue.overall} details={[
          { label: 'Analytics', value: totalRevenue.analytics },
          { label: 'Finance', value: totalRevenue.finance },
          { label: 'Timetable', value: totalRevenue.timetable }
        ]} />
        <MetricCard title="Bounced Cheques" value={bouncedCheques} />

        <Grid item xs={12} md={4}>
          <Typography variant="h6">Zeraki Analytics Target</Typography>
          <Pie data={pieChartConfig(signUpTargets.analytics)} options={chartOptions} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Zeraki Finance Target</Typography>
          <Pie data={pieChartConfig(signUpTargets.finance)} options={chartOptions} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Zeraki Timetable Target</Typography>
          <Pie data={pieChartConfig(signUpTargets.timetable)} options={chartOptions} />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6">Zeraki Analytics Sign-ups</Typography>
          <Bar data={barChartConfig(signUpDistribution.analytics)} options={chartOptions} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Zeraki Finance Sign-ups</Typography>
          <Bar data={barChartConfig(signUpDistribution.finance)} options={chartOptions} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Zeraki Timetable Sign-ups</Typography>
          <Bar data={barChartConfig(signUpDistribution.timetable)} options={chartOptions} />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Upcoming Invoices</Typography>
              <Grid container spacing={3}>
                {upcomingInvoices.map((invoice, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Typography variant="body1">{invoice.schoolName}</Typography>
                    <Typography variant="body2">Amount Due: {invoice.amountDue}</Typography>
                    <Typography variant="body2">Due Date: {invoice.dueDate}</Typography>
                    <Button variant="contained" color="primary" onClick={() => handlePayment(invoice)}>
                      Collect Payment
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {selectedInvoice && (
        <PaymentModal
          invoice={selectedInvoice}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

const MetricCard = ({ title, value, details }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        {details && details.map((detail, index) => (
          <Typography variant="body2" key={index}>{detail.label}: {detail.value}</Typography>
        ))}
      </CardContent>
    </Card>
  </Grid>
);

const PaymentModal = ({ invoice, onClose }) => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Valid');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = () => {
    console.log(`Collected payment for invoice: ${invoice.id}`);
    console.log(`Amount: ${amount}, Status: ${status}, Date: ${date}`);
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: 'white', padding: 20 }}>
        <Typography variant="h6">Collect Payment for {invoice.schoolName}</Typography>
        <TextField
          fullWidth
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value="Valid">Valid</option>
          <option value="Bounced">Bounced</option>
        </TextField>
        <TextField
          fullWidth
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default Dashboard;
