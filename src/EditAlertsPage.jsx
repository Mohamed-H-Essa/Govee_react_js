import React, { useState } from "react";
import "./EditAlertsPage.css"; // Make sure to style the buttons and tiles as per your needs

const EditAlertsPage = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      device_id: 101,
      reading_id: 2001,
      timestamp: "2024-08-14T15:00:00Z",
      acknowledged: false,
      disabled: false,
    },
    {
      id: 2,
      device_id: 102,
      reading_id: 2002,
      timestamp: "2024-08-14T16:00:00Z",
      acknowledged: true,
      disabled: false,
    },
    // Add more alerts as needed
  ]);

  const toggleAcknowledged = (alertId) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId
          ? { ...alert, acknowledged: !alert.acknowledged }
          : alert
      )
    );
  };

  const toggleDisabled = (alertId) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId ? { ...alert, disabled: !alert.disabled } : alert
      )
    );
  };

  const addAlert = () => {
    const newAlert = {
      id: alerts.length + 1,
      device_id: 100 + alerts.length + 1,
      reading_id: 2000 + alerts.length + 1,
      timestamp: new Date().toISOString(),
      acknowledged: false,
      disabled: false,
    };
    setAlerts([...alerts, newAlert]);
  };

  return (
    <div className="edit-alerts-page">
      <h1>Edit Alerts</h1>
      <button className="add-alert-button" onClick={addAlert}>
        Add Alert
      </button>
      <div className="alerts-container">
        {alerts.map((alert) => (
          <div key={alert.id} className="alert-tile">
            <p>
              <strong>Device ID:</strong> {alert.device_id}
            </p>
            <p>
              <strong>Reading ID:</strong> {alert.reading_id}
            </p>
            <p>
              <strong>Timestamp:</strong>{" "}
              {new Date(alert.timestamp).toLocaleString()}
            </p>
            <div className="button-container">
              <button
                className={`small-button ${
                  alert.acknowledged ? "acknowledged" : ""
                }`}
                onClick={() => toggleAcknowledged(alert.id)}
              >
                {alert.acknowledged ? "Acknowledged" : "Acknowledge"}
              </button>
              <button
                className={`small-button ${alert.disabled ? "disabled" : ""}`}
                onClick={() => toggleDisabled(alert.id)}
              >
                {alert.disabled ? "Disabled" : "Disable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditAlertsPage;
