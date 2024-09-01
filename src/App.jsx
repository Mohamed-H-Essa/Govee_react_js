import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Header from "./Header";
import ManageDevicesPage from "./EditDevicesPage";
import ManageReadingsPage from "./EditReadingsPage";
import ManageUsersPage from "./EditUsersPage";
import EditAlertsPage from "./EditAlertsPage";
import AlertsPage from "./AlertsPage";
import AdminPage from "./AdminPage";
import MainPage from "./Main";
import ProtectedRoute from "./ProtectedRoute";
import DeviceDetailsPage from "./DeviceDetailPage";
import UnauthorizedPage from "./UnauthorizedPage";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={<ProtectedRoute element={<MainPage />} />}
          />
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            path="devices/:id"
            element={<ProtectedRoute element={<DeviceDetailsPage />} />}
          />
          <Route
            path="admin"
            element={<ProtectedRoute element={<AdminPage />} isAdmin={true} />}
          />

          <Route path="unauthorized" element={<UnauthorizedPage />} />

          <Route
            exact
            path="/manage_devices"
            element={
              <ProtectedRoute element={<ManageDevicesPage />} isAdmin={true} />
            }
          />
          <Route exact path="/alerts" element={<AlertsPage />} />
          <Route
            exact
            path="/manage_alerts"
            element={
              <ProtectedRoute element={<EditAlertsPage />} isAdmin={true} />
            }
          />
          <Route
            exact
            path="/manage_users"
            element={
              <ProtectedRoute element={<ManageUsersPage />} isAdmin={true} />
            }
          />
          <Route
            exact
            path="/manage_readings"
            element={
              <ProtectedRoute element={<ManageReadingsPage />} isAdmin={true} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
