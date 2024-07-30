import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useEffect } from "react";
import { API_URL } from "./constants";
import { Typography } from "@mui/material";
import Loading from "./Loading";

const MainPage = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setLoading(true);
    console.log("hello from useeffect");

    const response = fetch(`${API_URL}/devices/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(async (value) => {
        if (value.status === 401) {
          setError("Unauthorized access, Please Sign In and try again");
        }
        if (value.status === 403) {
          setError("Forbidden access, Admind access only!");
        }
        if (value.status === 200) {
        }
        const data = await value.json();

        setDevices(data);
        setLoading(false);
        return;
      })
      .catch((error) => {
        setError(`An Error has occured! Unkown error: !${error}`);
        console.log(error);
        setLoading(false);
        return;
      });
  }, []);

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
      {loading ? (
        <Loading />
      ) : error !== "" ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <div>
            <label>Select Device: </label>
            <Select
              value={selectedDevice}
              onChange={handleDeviceChange}
              options={devices.map((device) => ({
                label: device.id + " " + device.deviceModel,
                value: device.id,
              }))}
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
                className="custom-date-picker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                placeholderText="Start Date"
                dateFormat="MMMM d, yyyy"
              />
              <DatePicker
                className="custom-date-picker"
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
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default MainPage;
