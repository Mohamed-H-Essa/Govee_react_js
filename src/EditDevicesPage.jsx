import React, { useDebugValue } from "react";
import { Grid, Container, Typography } from "@mui/material";
import DeviceCard from "./DeviceCard";
import { useEffect } from "react";
import { API_URL } from "./constants";
import { useState } from "react";

const ManageDevicesPage = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetch(API_URL + "/devices/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(async (response) => {
        if (response.status === 401) {
          console.log("Unauthorized access, Please Sign In and try again");
          return;
        }
        if (response.status === 403) {
          console.log("Forbidden access, Admin access only!");
          return;
        }
        if (response.status === 200) {
          console.log("Success");

          const data = await response.json();
          setDevices(data);

          console.log(data);
          return;
        }
      })
      .catch((error) => {
        console.error(`An Error has occured! Unkown error: !${error}`);
        return;
      });
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit device with id: ${id}`);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Devices
      </Typography>
      {devices.length === 0 ? (
        <Typography variant="h6" component="p">
          No devices found
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {devices.map((device) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={device.id}>
              <DeviceCard device={device} onEdit={handleEdit} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ManageDevicesPage;
