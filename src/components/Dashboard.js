import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import 'chart.js/auto';

const Dashboard = () => {
  const [collections, setCollections] = useState(0);
  const [signUps, setSignUps] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
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

  useEffect(() => {
    // Fetch collections, signups, total revenue, and bounced cheques
    axios.get('http://localhost:3001/metrics').then(response => {
      setCollections(response.data.collections);
      setSignUps(response.data.signUps);
      setTotalRevenue(response.data.totalRevenue);
      setBouncedCheques(response.data.bouncedCheques);
    }).catch(error => console.error('Error fetching metrics:', error));

    // Fetch signup targets
    axios.get('http://localhost:3001/signupTargets').then(response => {
      setSignUpTargets(response.data);
    }).catch(error => console.error('Error fetching signup targets:', error));

    // Fetch signup distribution
    axios.get('http://localhost:3001/signupDistribution').then(response => {
      setSignUpDistribution(response.data);
    }).catch(error => console.error('Error fetching signup distribution:', error));
  }, []);

  const renderPieChart = (data) => {
    return (
      <Pie
        data={{
          labels: ['Achieved', 'Target'],
          datasets: [
            {
              data: [data.achieved, data.target - data.achieved],
              backgroundColor: ['#36A2EB', '#FF6384'],
            },
          ],
        }}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ${context.raw}`,
              },
            },
          },
        }}
      />
    );
  };

  const renderBarChart = (data) => {
    return (
      <Bar
        data={{
          labels: ['Primary', 'Secondary', 'IGCSE'],
          datasets: [
            {
              label: 'Sign-ups',
              data: [data.primary, data.secondary, data.igcse],
              backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            },
          ],
        }}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.raw}`,
              },
            },
          },
        }}
      />
    );
  };

  return (
    <div className="dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Collections</Typography>
              <Typography variant="h4">{collections}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Sign-ups</Typography>
              <Typography variant="h4">{signUps}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h4">{totalRevenue}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Bounced Cheques</Typography>
              <Typography variant="h4">{bouncedCheques}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6">Zeraki Analytics Target</Typography>
          {renderPieChart(signUpTargets.analytics)}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Zeraki Finance Target</Typography>
          {renderPieChart(signUpTargets.finance)}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Zeraki Timetable Target</Typography>
          {renderPieChart(signUpTargets.timetable)}
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6">Zeraki Analytics Sign-ups</Typography>
          {renderBarChart(signUpDistribution.analytics)}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Zeraki Finance Sign-ups</Typography>
          {renderBarChart(signUpDistribution.finance)}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Zeraki Timetable Sign-ups</Typography>
          {renderBarChart(signUpDistribution.timetable)}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
