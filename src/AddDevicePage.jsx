import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { API_URL } from "./constants";

const AddDevicePage = () => {
  const [formData, setFormData] = useState({
    deviceModel: "",
    serialNumber: "",
    startDate: "",
    probeType: "",
    firmwareVersion: "",
    loggingInterval: "15m",
    alarmLoggingInterval: "15m",
    storageMode: "Loop",
    buttonStop: false,
    muteButton: false,
    alarmTone: true,
    maxTemperature: "",
    minTemperature: "",
    maxHumidity: "",
    minHumidity: "",
    alertMaxTemp: "",
    alertMinTemp: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError("");
    setSuccess("");
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const date = new Date(formData.startDate);
      const localDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60000
      );

      const formattedData = {
        ...formData,
        startDate: localDate,
        maxTemperature: Number(formData.maxTemperature),
        minTemperature: Number(formData.minTemperature),
        maxHumidity: Number(formData.maxHumidity),
        minHumidity: Number(formData.minHumidity),
        alertMaxTemp: Number(formData.alertMaxTemp),
        alertMinTemp: Number(formData.alertMinTemp),
      };
      const token = localStorage.getItem("token");
      console.log(JSON.stringify(formattedData));
      const response = await fetch(`${API_URL}/devices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        console.log(response.body);
        throw new Error("Failed to add device");
      } else {
        setFormData({
          deviceModel: "",
          serialNumber: "",
          startDate: "",
          probeType: "",
          firmwareVersion: "",
          loggingInterval: "15m",
          alarmLoggingInterval: "15m",
          storageMode: "Loop",
          buttonStop: false,
          muteButton: false,
          alarmTone: true,
          maxTemperature: "",
          minTemperature: "",
          maxHumidity: "",
          minHumidity: "",
          alertMaxTemp: "",
          alertMinTemp: "",
          location: "",
        });
      }

      setSuccess("Device added successfully");
      setError("");
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  // Check if all required fields are filled
  const isFormValid =
    formData.deviceModel &&
    formData.startDate &&
    formData.loggingInterval &&
    formData.alarmLoggingInterval &&
    formData.maxTemperature &&
    formData.minTemperature &&
    formData.maxHumidity &&
    formData.minHumidity &&
    formData.maxHumidity > formData.minHumidity &&
    formData.maxTemperature > formData.minTemperature &&
    formData.serialNumber &&
    formData.alertMaxTemp &&
    formData.alertMinTemp;

  return (
    <Container className="mt-4">
      <h2>Add New Device</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Device Model <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="deviceModel"
                value={formData.deviceModel}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Serial Number <span className="text-danger">*</span>
              </Form.Label>

              <Form.Control
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Start Date <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Probe Type</Form.Label>
              <Form.Control
                type="text"
                name="probeType"
                value={formData.probeType}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Firmware Version</Form.Label>
              <Form.Control
                type="text"
                name="firmwareVersion"
                value={formData.firmwareVersion}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Logging Interval <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="loggingInterval"
                value={formData.loggingInterval}
                onChange={handleChange}
                required
              >
                <option value="15m">15m</option>
                <option value="30m">30m</option>
                <option value="1h">1h</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Alarm Logging Interval <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="alarmLoggingInterval"
                value={formData.alarmLoggingInterval}
                onChange={handleChange}
                required
              >
                <option value="15m">15m</option>
                <option value="30m">30m</option>
                <option value="1h">1h</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Storage Mode</Form.Label>
              <Form.Control
                as="select"
                name="storageMode"
                value={formData.storageMode}
                onChange={handleChange}
              >
                <option value="Loop">Loop</option>
                <option value="Stop">Stop</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Button Stop"
                name="buttonStop"
                checked={formData.buttonStop}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Mute Button"
                name="muteButton"
                checked={formData.muteButton}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Alarm Tone"
                name="alarmTone"
                checked={formData.alarmTone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Max Temperature (°C) <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="maxTemperature"
                value={formData.maxTemperature}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Min Temperature (°C) <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="minTemperature"
                value={formData.minTemperature}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Max Humidity (%) <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="maxHumidity"
                value={formData.maxHumidity}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Min Humidity (%) <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="minHumidity"
                value={formData.minHumidity}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alert Max Temp</Form.Label>
              <Form.Control
                type="number"
                name="alertMaxTemp"
                value={formData.alertMaxTemp}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Alert Min Temp</Form.Label>
              <Form.Control
                type="number"
                name="alertMinTemp"
                value={formData.alertMinTemp}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" disabled={!isFormValid}>
          Add Device
        </Button>
      </Form>
    </Container>
  );
};

export default AddDevicePage;
