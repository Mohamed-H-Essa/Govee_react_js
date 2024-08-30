import React, { useState } from "react";
import "./EditAlertsPage.css"; // Make sure to style the buttons and tiles as per your needs
import { Loading } from "./Loading";
import { useEffect } from "react";
import { API_URL } from "./constants";
import { jwtDecode } from "jwt-decode";
import Button from "react-bootstrap/Button";

const AlertsPage = () => {
  const [loading, setLoading] = useState(true);

  const [alerts, setAlerts] = useState();
  const [filterAcknowledged, setFilterAcknowledged] = useState(false);
  const [filterLive, setFilterLive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch(API_URL + "/alerts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const decodedToken = jwtDecode(token);

        const roles = decodedToken.roles || [];

        if (roles.includes("admin") || roles.includes("super_admin")) {
          setIsAdmin(true);
        }

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
          setAlerts(data);

          console.log(data);
          return;
        }
      })
      .catch((error) => {
        console.error(`An Error has occured! Unkown error: !${error}`);
        return;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEdit = (alertId, editObject) => {
    const call = () => {
      setLoading(true);
      fetch(API_URL + `/alerts/${alertId}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        body: JSON.stringify(editObject),
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

            const r = await response.json();
            if (r.length == 0) return;
            const data = r[0];

            console.log(data);
            console.log(alerts);
            setAlerts(
              alerts.map((alert) => (alert.id == data.id ? data : alert))
            );
            console.log(alerts);

            return;
          }
        })
        .catch((error) => {
          console.error(`An Error has occured! Unkown error: !${error}`);
          return;
        })
        .finally(() => {
          setLoading(false);
        });
    };
    call();

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

  if (loading) return <Loading type="spinningBubbles" />;

  return (
    <div className="edit-alerts-page">
      <div>
        <h1 style={{ display: "inline-block", marginRight: 40 }}>Alerts</h1>
        <Button
          className={`small-button ${
            filterAcknowledged ? "acknowledged" : "acknowledge"
          }`}
          onClick={() => setFilterAcknowledged(!filterAcknowledged)}
        >
          {filterAcknowledged
            ? "Remove Acknowledged Filter"
            : "Only Show Acknowledged"}
        </Button>
        <button
          className={`small-button ${!filterLive ? "live" : "disabled"}`}
          onClick={() => setFilterLive(!filterLive)}
        >
          {filterLive ? "Remove Live Filter" : "Only Show Live"}
        </button>
      </div>
      <div className="alerts-container">
        {alerts
          .filter((alert) => {
            return filterAcknowledged ? !alert.acknowledged : true;
          })
          .filter((alert) => {
            return filterLive ? alert.live : true;
          })
          .map((alert) => (
            <div key={alert.id} className="alert-tile">
              <p>
                <strong>Device ID:</strong> {alert.device_id}
              </p>
              <p>
                <strong>Reading ID:</strong> {alert.reading_id}
              </p>
              <p>
                <strong>Timestamp: </strong>{" "}
                {new Date(alert.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Message: </strong> {alert.message}
              </p>
              <div className="button-container">
                <button
                  className={`small-button ${
                    alert.acknowledged ? "acknowledged" : "acknowledge"
                  }`}
                  disabled={alert.acknowledged}
                  onClick={() => handleEdit(alert.id, { acknowledged: true })}
                >
                  {alert.acknowledged ? "Acknowledged" : "Acknowledge"}
                </button>
                <button
                  className={`small-button ${
                    alert.live ? "live" : "disabled"
                  } ${isAdmin ? "admin" : ""}`}
                  disabled={!alert.live}
                  onClick={() =>
                    isAdmin ? handleEdit(alert.id, { live: false }) : null
                  }
                >
                  {alert.live ? (isAdmin ? "Disable" : "Live") : "Disabled"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AlertsPage;
