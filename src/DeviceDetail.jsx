import React from "react";
import PropTypes from "prop-types";
import './DeviceDetails.css'; // Make sure to import your CSS file

const DeviceDetails = ({ device }) => {
  return (
    <div className="device-details-container">
      <h2>Device Details</h2>
      <div className="device-detail">
        <span className="device-detail-label">Model:</span>
        <span className="device-detail-value">{device.deviceModel}</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Serial Number:</span>
        <span className="device-detail-value">{device.serialNumber ?? "N/A"}</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Start Date:</span>
        <span className="device-detail-value">{new Date(device.startDate).toLocaleString()}</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Probe Type:</span>
        <span className="device-detail-value">{device.probeType ?? "N/A"}</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Firmware Version:</span>
        <span className="device-detail-value">{device.firmwareVersion ?? "N/A"}</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Logging Interval:</span>
        <span className="device-detail-value">{device.loggingInterval}</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Alarm Logging Interval:</span>
        <span className="device-detail-value">{device.alarmLoggingInterval}</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Storage Mode:</span>
        <span className="device-detail-value">{device.storageMode}</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Button Stop:</span>
        <span className="device-detail-value">{device.buttonStop ? "Yes" : "No"}</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Mute Button:</span>
        <span className="device-detail-value">{device.muteButton ? "Yes" : "No"}</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Alarm Tone:</span>
        <span className="device-detail-value">{device.alarmTone ? "Yes" : "No"}</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Max Temperature:</span>
        <span className="device-detail-value">{device.maxTemperature} °C</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Min Temperature:</span>
        <span className="device-detail-value">{device.minTemperature} °C</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Max Humidity:</span>
        <span className="device-detail-value">{device.maxHumidity} %</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Min Humidity:</span>
        <span className="device-detail-value">{device.minHumidity} %</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Created By:</span>
        <span className="device-detail-value">{device.createdById}</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Created At:</span>
        <span className="device-detail-value">{new Date(device.createdAt).toLocaleString()}</span>
      </div>
      <div className="device-detail">
        <span className="device-detail-label">Updated At:</span>
        <span className="device-detail-value">{device.updatedAt ? new Date(device.updatedAt).toLocaleString() : "N/A"}</span>
      </div>
    </div>
  );
};

DeviceDetails.propTypes = {
  device: PropTypes.shape({
    id: PropTypes.number.isRequired,
    deviceModel: PropTypes.string.isRequired,
    serialNumber: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    probeType: PropTypes.string,
    firmwareVersion: PropTypes.string,
    loggingInterval: PropTypes.string.isRequired,
    alarmLoggingInterval: PropTypes.string.isRequired,
    storageMode: PropTypes.string.isRequired,
    buttonStop: PropTypes.bool.isRequired,
    muteButton: PropTypes.bool.isRequired,
    alarmTone: PropTypes.bool.isRequired,
    maxTemperature: PropTypes.number.isRequired,
    minTemperature: PropTypes.number.isRequired,
    maxHumidity: PropTypes.number.isRequired,
    minHumidity: PropTypes.number.isRequired,
    createdById: PropTypes.number.isRequired,
    updatedById: PropTypes.number,
    deletedById: PropTypes.number,
    deletedAt: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
  }).isRequired,
};

export default DeviceDetails;
