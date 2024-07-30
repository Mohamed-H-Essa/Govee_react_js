import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import Header from "./Header";
import EditReadingsPage from "./EditingReadingsPage";
import AdminPage from "./AdminPage";
import EditingDevicePage from "./EditingDevicePage";
import EditingUserPage from "./EditingUserPage";
import MainPage from "./Main";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<ProtectedRoute element={<MainPage />} />} />
          <Route exact path="/manage_users" element={<ProtectedRoute  element={<EditingUserPage />} />} />
          <Route exact path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
