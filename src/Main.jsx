import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useEffect } from "react";
import { API_URL } from "./constants";
import { Typography } from "@mui/material";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        localStorage.setItem("devices", JSON.stringify(data));
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

  const handleExportReport = async () => {
    setError("");
    setLoading(true);
    try {
      let queryString = "?";
      if (startDate) {
        queryString += "startDate=" + startDate.toISOString() + "&";
      }
      if (endDate) {
        queryString += "endDate=" + endDate.toISOString();
      }
      await downloadFileWithGet(
        `${API_URL}/reports/` + selectedDevice.value + queryString,

        selectedDevice.label + "_" + selectedDevice.value,

        localStorage.getItem("token")
      );

      setLoading(false);
    } catch (e) {
      setError(`Error: ${e}`);
      setLoading(false);
      return;
    }
  };

  const handleExportXLSX = async () => {
    setError("");
    setLoading(true);
    try {
      let body = {};
      if (startDate) {
        body.startDate = startDate.toISOString();
      }
      if (endDate) {
        body.endDate = endDate.toISOString();
      }
      console.log("local:");
      console.log(body.startDate.toLocaleString());
      console.log(body);
      await downloadFileWithPost(
        `${API_URL}/excel/${selectedDevice.value}`,
        selectedDevice.label + "_" + selectedDevice.value,
        body
      );
    } catch (e) {
      setError(` An error has occured while exporting the readings: ${e}`);
    }
    setLoading(false);
    return;
  };

  const handleShowReadings = () => {
    try {
      const d = startDate.toISOString();
      console.log(d);
      console.log(startDate);
      console.log(endDate);
    } catch (e) {
      setError("Please select a date");
    }
  };

  const handleShowDeviceDetails = () => {
    console.log(selectedDevice);
    navigate(`/devices/${selectedDevice.value}`);
  };
  async function downloadFileWithGet(url, fileName, token) {
    try {
      // Make the request using fetch
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(
          `An error has occurred while downloading the file: ${response.statusText}`
        );
        return;
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `readings_for_${fileName}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
    }
  }

  async function downloadFileWithPost(url, fileName, body) {
    try {
      // Make the request using fetch
      const response = await fetch(url, {
        method: "POST", // Use POST if you need to include a body
        headers: {
          "Content-Type": "application/json", // Adjust content type as needed
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        setError(
          `An error has occured while exporting the readings: ${response.statusText}`
        );
        return;
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(blob);

      // Create an <a> element and trigger a download
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `readings_for_${fileName}.xlsx`; // Set the desired file name
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
    }
  }

  function handleToAdminPage() {
    navigate("/admin");
  }

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
        <Loading type="spinningBubbles" />
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
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                dateFormat="MMMM d, yyyy"
              />
              <DatePicker
                className="custom-date-picker"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                placeholderText="End Date"
                dateFormat="MMMM d, yyyy"
              />
            </div>
          </div>
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              onClick={handleShowDeviceDetails}
              disabled={!selectedDevice}
            >
              Show Device Details
            </button>
            <button onClick={handleExportReport} disabled={!selectedDevice}>
              Export Readings Report
            </button>
            <button onClick={handleExportXLSX} disabled={!selectedDevice}>
              Export Readings XLSX
            </button>
            <button
              onClick={() => {
                navigate("/alerts");
              }}
              // disabled={!selectedDevice || !startDate || !endDate}
            >
              Open Alerts
            </button>
          </div>

          <div className="admin-page-button">
            <button onClick={handleToAdminPage}>Admin Page</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
