import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { API_URL } from "./constants";
// import jwtDecode from "jwt-decode"; // Ensure correct import

import { jwtDecode } from "jwt-decode";

const AlertsPage = () => {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [filterAcknowledged, setFilterAcknowledged] = useState(false);
  const [filterLive, setFilterLive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchAlerts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/alerts/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const decodedToken = jwtDecode(token);
        const roles = decodedToken.roles || [];
        setIsAdmin(roles.includes("admin") || roles.includes("super_admin"));

        const data = await response.json();
        setAlerts(data);
      } else {
        console.log("Unauthorized or forbidden access");
      }
    } catch (error) {
      console.error(`Error fetching alerts: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleEdit = async (alertId, editObject) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/alerts/${alertId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editObject),
      });

      if (response.ok) {
        // const updatedAlert = await response.json();
        await fetchAlerts();
      }
    } catch (error) {
      console.error(`Error editing alert: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container>
      <Row className="my-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h1>Alerts</h1>
          <div>
            <Button
              variant={filterAcknowledged ? "warning" : "outline-warning"}
              className="me-2"
              onClick={() => setFilterAcknowledged(!filterAcknowledged)}
            >
              {filterAcknowledged ? "Show All" : "Only Show Un-acknowledged"}
            </Button>
            <Button
              variant={filterLive ? "success" : "outline-success"}
              onClick={() => setFilterLive(!filterLive)}
            >
              {filterLive ? "Show All" : "Only Show Live"}
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        {alerts
          .filter((alert) => (filterAcknowledged ? !alert.acknowledged : true))
          .filter((alert) => (filterLive ? alert.live : true))
          .map((alert) => (
            <Col key={alert.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Device ID: {alert.device_id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Reading ID: {alert.reading_id}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Timestamp:</strong>{" "}
                    {new Date(alert.timestamp).toLocaleString()}
                    <br />
                    <strong>Message:</strong> {alert.message}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant={alert.acknowledged ? "secondary" : "primary"}
                      disabled={alert.acknowledged}
                      onClick={() =>
                        handleEdit(alert.id, { acknowledged: true })
                      }
                    >
                      {alert.acknowledged ? "Acknowledged" : "Acknowledge"}
                    </Button>
                    {isAdmin && (
                      <Button
                        variant={alert.live ? "danger" : "secondary"}
                        disabled={!alert.live}
                        onClick={() => handleEdit(alert.id, { live: false })}
                      >
                        {alert.live ? "Disable" : "Disabled"}
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default AlertsPage;
