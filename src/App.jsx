// App.js
import React from "react";
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
import DeviceTable from "./DeviceTable";
import AddDevicePage from "./AddDevicePage";
import InjectionPage from "./InjectionPage";
import NotFoundPage from "./NotFoundPage"; // Import the NotFoundPage component
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route
            path="*"
            element={
              <>
                <Header />
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={<ProtectedRoute element={<DeviceTable />} />}
                  />
                  <Route
                    path="devices/:id"
                    element={<ProtectedRoute element={<DeviceDetailsPage />} />}
                  />
                  <Route
                    path="admin"
                    element={
                      <ProtectedRoute element={<AdminPage />} isAdmin={true} />
                    }
                  />
                  <Route
                    exact
                    path="/manage_devices"
                    element={
                      <ProtectedRoute
                        element={<ManageDevicesPage />}
                        isAdmin={true}
                      />
                    }
                  />
                  <Route exact path="/alerts" element={<AlertsPage />} />
                  <Route
                    exact
                    path="/manage_alerts"
                    element={
                      <ProtectedRoute
                        element={<EditAlertsPage />}
                        isAdmin={true}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/manage_users"
                    element={
                      <ProtectedRoute
                        element={<ManageUsersPage />}
                        isAdmin={true}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/manage_readings"
                    element={
                      <ProtectedRoute
                        element={<ManageReadingsPage />}
                        isAdmin={true}
                      />
                    }
                  />
                  <Route path="/home" element={<DeviceTable />} />
                  <Route path="/add_device" element={<AddDevicePage />} />
                  <Route path="/injection" element={<InjectionPage />} />

                  {/* 404 Not Found Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
