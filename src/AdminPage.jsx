import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DevicesIcon />}
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => {
              navigate("/manage_devices");
            }}
          >
            Manage Devices
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PeopleIcon />}
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => {
              navigate("/manage_users");
            }}
          >
            Manage Users
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<NotificationsIcon />}
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => {
              navigate("/manage_alerts");
            }}
          >
            Manage Alerts
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AssessmentIcon />}
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => {
              navigate("/manage_readings");
            }}
          >
            Manage Readings
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPage;
