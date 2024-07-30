import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import DeviceCard from './DeviceCard';

const devices = [
  {
    id: 1,
    deviceModel: 'Model 756-AA',
    serialNumber: '123456z33bb',
    startDate: '2023-01-01T00:00:00Z',
    probeType: 'Type A',
    firmwareVersion: '13.7.3',
    loggingInterval: '15m',
    alarmLoggingInterval: '15m',
    storageMode: 'Loop',
    buttonStop: false,
    muteButton: false,
    alarmTone: true,
    maxTemperature: 30,
    minTemperature: 0,
    maxHumidity: 60,
    minHumidity: 40,
  },
  {
    id: 2,
    deviceModel: 'Model 756-BB',
    serialNumber: '123456z33cc',
    startDate: '2023-01-01T00:00:00Z',
    probeType: 'Type B',
    firmwareVersion: '3.10.0',
    loggingInterval: '15m',
    alarmLoggingInterval: '15m',
    storageMode: 'Loop',
    buttonStop: false,
    muteButton: false,
    alarmTone: true,
    maxTemperature: 20,
    minTemperature: -10,
    maxHumidity: 80,
    minHumidity: 50,
  },
];

const EditDevicesPage = () => {
  const handleEdit = (id) => {
    console.log(`Edit device with id: ${id}`);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Devices
      </Typography>
      <Grid container spacing={3}>
        {devices.map((device) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={device.id}>
            <DeviceCard device={device} onEdit={handleEdit} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EditDevicesPage;
