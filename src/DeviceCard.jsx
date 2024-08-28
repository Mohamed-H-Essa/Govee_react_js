import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";

const LightBlueCard = styled(Card)({
  backgroundColor: "#e0f7fa", // light blue background
});

const DeviceCard = ({ device, onEdit }) => {
  return (
    <LightBlueCard>
      <CardContent>
        <Typography color="textPrimary" variant="h6" component="div">
          {device.deviceModel}
        </Typography>
        <Typography color="textSecondary">
          Serial Number: {device.serialNumber}
        </Typography>
        <Typography color="textSecondary">
          Start Date: {new Date(device.startDate).toLocaleDateString()}
        </Typography>
        <Typography color="textSecondary">
          Probe Type: {device.probeType}
        </Typography>
        <Typography color="textSecondary">
          Firmware Version: {device.firmwareVersion}
        </Typography>
        <Typography color="textSecondary">
          Logging Interval: {device.loggingInterval}
        </Typography>
        <Typography color="textSecondary">
          Alarm Logging Interval: {device.alarmLoggingInterval}
        </Typography>
        <Typography color="textSecondary">
          Storage Mode: {device.storageMode}
        </Typography>
        <Typography color="textSecondary">
          Button Stop: {device.buttonStop ? "Yes" : "No"}
        </Typography>
        <Typography color="textSecondary">
          Mute Button: {device.muteButton ? "Yes" : "No"}
        </Typography>
        <Typography color="textSecondary">
          Alarm Tone: {device.alarmTone ? "Yes" : "No"}
        </Typography>
        <Typography color="textSecondary">
          Max Temperature: {device.maxTemperature}°C
        </Typography>
        <Typography color="textSecondary">
          Min Temperature: {device.minTemperature}°C
        </Typography>
        <Typography color="textSecondary">
          Max Humidity: {device.maxHumidity}%
        </Typography>
        <Typography color="textSecondary">
          Min Humidity: {device.minHumidity}%
        </Typography>
        <IconButton onClick={() => onEdit(device.id)}>
          <EditIcon />
        </IconButton>
      </CardContent>
    </LightBlueCard>
  );
};

export default DeviceCard;
