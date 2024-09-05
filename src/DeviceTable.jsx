import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Spinner,
  Form,
  ButtonGroup,
  Button,
  Modal,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { API_URL } from "./constants";
import { Link, useNavigate } from "react-router-dom";

const DeviceTable = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setSuccess("");
    setError("");
    setShow(true);
  };

  const handleConfirm = () => {
    handleClose();
    deleteSelectedDevices();
  };

  const deleteSelectedDevices = async () => {
    const token = localStorage.getItem("token");
    const selectedDeviceIds = selectedDevices;
    console.log(selectedDeviceIds);
    try {
      const response = await fetch(`${API_URL}/devices`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deviceIds: selectedDeviceIds }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Failed to delete devices");
        throw new Error(data.message || "Failed to delete devices");
      }
      setSuccess("Devices deleted successfully");

      console.log(data);

      setDevices((prevDevices) =>
        prevDevices.filter((device) => !selectedDeviceIds.includes(device.id))
      );
      setSelectedDevices([]);
    } catch (error) {
      console.error("Error deleting devices:", error);
    }
  };

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/devices/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch devices");
        }

        console.log(data);

        setDevices(data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleSelect = (deviceId) => {
    setSelectedDevices((prevSelected) =>
      prevSelected.includes(deviceId)
        ? prevSelected.filter((id) => id !== deviceId)
        : [...prevSelected, deviceId]
    );
  };

  const handleInject = () => {
    const injectionIds = selectedDevices;
    navigate("/injection", { state: { injectionIds } });
  };

  const handleExportReport = async () => {
    setError("");
    setLoadingExport(true);
    try {
      let queryString = "?";
      if (startDate) {
        const date = new Date(startDate);
        const localDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        queryString += "startDate=" + localDate.toISOString() + "&";
      }
      if (endDate) {
        const date = new Date(endDate);
        const localDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        queryString += "endDate=" + localDate.toISOString();
      }

      selectedDevices.forEach(async (id) => {
        console.log("Downloading Report for device:", id);
        await downloadFileWithGet(
          `${API_URL}/reports/` +
            id +
            (startDate || endDate ? queryString : ""),
          devices.find((device) => device.id === id).deviceModel + "_" + id,
          localStorage.getItem("token")
        );
      });
    } catch (e) {
      setError(`Error: ${e}`);
      return;
    } finally {
      setLoadingExport(false);
    }
  };

  const handleExportXLSX = async () => {
    setError("");
    setLoading(true);
    try {
      let body = {};
      if (startDate) {
        const date = new Date(startDate);
        const localDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        body.startDate = localDate.toISOString();
      }
      if (endDate) {
        const date = new Date(endDate);
        const localDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        body.endDate = localDate.toISOString();
      }
      console.log(body);

      selectedDevices.forEach(async (id) => {
        await downloadFileWithPost(
          `${API_URL}/excel/${id}`,
          devices.find((device) => device.id === id).deviceModel + "_" + id,
          body
        );
      });
    } catch (e) {
      setError(` An error has occured while exporting the readings: ${e}`);
    }
    setLoading(false);
    return;
  };

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

  return (
    <div className="container mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center ">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-center mt-3">
            <button
              className={
                "btn me-2 w-100 bg-danger text-white " +
                (selectedDevices.length === 0 ? "disabled" : "")
              }
              onClick={() => {
                handleShow();
              }}
            >
              Delete Selected Devices
            </button>
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                setError("");
                setSuccess("");
                navigate("/add_device");
              }}
            >
              Add Device
            </button>
          </div>

          <hr class="hr hr-blurry  mt-5" />
          <Row className="mt-2">
            <Col md={6}>
              <Form.Group className="mb-0">
                <Form.Label>
                  Start Date <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => {
                    const { value } = e.target;
                    setStartDate(value);
                  }}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-0">
                <Form.Label>
                  End Date <em>(Not Inclusive)</em>
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => {
                    const { value } = e.target;
                    setEndDate(value);
                  }}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-center mt-3 pb-3 pt-0">
            <button
              className={
                "btn me-2 w-100 btn-outline-primary " +
                (selectedDevices.length === 0 ? "disabled" : "")
              }
              onClick={() => {
                setError("");
                setSuccess("");
                handleExportReport();
              }}
            >
              Export Reports
            </button>
            <button
              className={
                "btn btn-primary w-100 " +
                (selectedDevices.length === 0 ? "disabled" : "")
              }
              onClick={() => {
                setError("");
                setSuccess("");
                handleExportXLSX();
              }}
            >
              Export Excel Sheets
            </button>
          </div>
          <hr class="hr hr-blurry py-3" />
          <ButtonGroup className="mt-3 mb-3 py-0 me-3">
            <Button
              variant="outline-primary"
              onClick={() => {
                setError("");
                setSuccess("");
                setSelectedDevices(devices.map((device) => device.id));
              }}
            >
              Select All
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setError("");
                setSuccess("");
                setSelectedDevices([]);
              }}
            >
              Unselect All
            </Button>
          </ButtonGroup>
          <ButtonGroup className="mt-3 mb-3 py-0 me-3">
            <Button
              className={selectedDevices.length === 0 ? "disabled" : ""}
              variant="primary"
              onClick={() => {
                setError("");
                setSuccess("");
                handleInject();
              }}
            >
              Inject
            </Button>
          </ButtonGroup>
          <div
            className="overflow-scroll h-100"
            style={{ maxHeight: "700px", overflowY: "auto" }}
          >
            <Table striped bordered hover className="w-100">
              <thead
                className="thead-dark"
                style={{ position: "sticky", top: "0" }}
              >
                <tr>
                  <th>Select</th>
                  <th>Device Model</th>
                  <th>Serial Number</th>
                  <th>Start Date</th>
                  <th>Probe Type</th>
                  <th>Firmware Version</th>
                  <th>Logging Interval</th>
                  <th>Alarm Logging Interval</th>
                  <th>Storage Mode</th>
                  <th>Button Stop</th>
                  <th>Mute Button</th>
                  <th>Alarm Tone</th>
                  <th>Max Temperature</th>
                  <th>Min Temperature</th>
                  <th>Max Humidity</th>
                  <th>Min Humidity</th>
                  <th>Location</th>
                  <th>Created By</th>
                  <th>Updated By</th>
                  <th>Deleted By</th>
                  <th>Deleted At</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => (
                  <tr
                    key={device.id}
                    className={
                      selectedDevices.includes(device.id) ? "table-primary" : ""
                    }
                  >
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedDevices.includes(device.id)}
                        onChange={() => handleSelect(device.id)}
                      />
                    </td>
                    <td>{device.deviceModel}</td>
                    <td>{device.serialNumber || "N/A"}</td>
                    <td>{new Date(device.startDate).toLocaleDateString()}</td>
                    <td>{device.probeType || "N/A"}</td>
                    <td>{device.firmwareVersion || "N/A"}</td>
                    <td>{device.loggingInterval || "N/A"}</td>
                    <td>{device.alarmLoggingInterval || "N/A"}</td>
                    <td>{device.storageMode || "N/A"}</td>
                    <td>{device.buttonStop ? "Yes" : "No"}</td>
                    <td>{device.muteButton ? "Yes" : "No"}</td>
                    <td>{device.alarmTone ? "Yes" : "No"}</td>
                    <td>{device.maxTemperature}°C</td>
                    <td>{device.minTemperature}°C</td>
                    <td>{device.maxHumidity}%</td>
                    <td>{device.minHumidity}%</td>
                    <td>{device.location || "N/A"}</td>
                    <td>{device.createdById || "N/A"}</td>
                    <td>{device.updatedById || "N/A"}</td>
                    <td>{device.deletedById || "N/A"}</td>
                    <td>
                      {device.deletedAt
                        ? new Date(device.deletedAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {device.createdAt
                        ? new Date(device.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {device.updatedAt
                        ? new Date(device.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <hr class="hr" />
          {/* Confirmation Modal */}
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to proceed?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirm}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default DeviceTable;
