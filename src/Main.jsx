import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from "axios";
import { Navigate } from "react-router-dom";

const devices = [
  { value: "device1", label: "Device 1" },
  { value: "device2", label: "Device 2" },
  { value: "device3", label: "Device 3" },
  // Add more devices as needed
];

const MainPage = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDeviceChange = (selectedOption) => {
    setSelectedDevice(selectedOption);
  };

  const handleExportReport = () => {
    // Implement export readings report logic
    alert("Export readings report");
  };

  const handleExportXLSX = () => {
    // Implement export readings to XLSX logic
    alert("Export readings to XLSX");
  };

  const handleShowReadings = () => {
    // Implement show readings logic
    alert("Show readings");
  };

  const handleShowDeviceDetails = () => {
    // Implement show device details logic
    alert("Show device details");
  };
  // return ( <Navigate to={'/login'} replace /> );

  return (
    <div
      style={{
        backgroundColor: "#333",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <div>
        <label>Select Device: </label>
        <Select
          value={selectedDevice}
          onChange={handleDeviceChange}
          options={devices}
          placeholder="Select a device"
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "#555",
              color: "white",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "white",
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: "#555",
              color: "white",
            }),
          }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>Pick a period of time: </label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            placeholderText="Start Date"
            dateFormat="MMMM d, yyyy"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            placeholderText="End Date"
            dateFormat="MMMM d, yyyy"
          />
        </div>
      </div>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={handleShowDeviceDetails}
          style={{
            padding: "10px",
            backgroundColor: "#444",
            color: "white",
            border: "none",
          }}
        >
          Show Device Details
        </button>
        <button
          onClick={handleExportReport}
          style={{
            padding: "10px",
            backgroundColor: "#444",
            color: "white",
            border: "none",
          }}
        >
          Export Readings Report
        </button>
        <button
          onClick={handleExportXLSX}
          style={{
            padding: "10px",
            backgroundColor: "#444",
            color: "white",
            border: "none",
          }}
        >
          Export Readings XLSX
        </button>
        <button
          onClick={handleShowReadings}
          style={{
            padding: "10px",
            backgroundColor: "#444",
            color: "white",
            border: "none",
          }}
        >
          Show Readings
        </button>
      </div>
    </div>
  );
};

export default MainPage;
