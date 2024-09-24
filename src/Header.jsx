// Header.js
import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log("Sign Out");
    localStorage.removeItem("token"); // Remove the token or any other sign-out logic
    navigate("/login");
  };

  const handleManageUsers = () => {
    navigate("/manage_users");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Navbar Brand */}
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Govee
        </Navbar.Brand>

        {/* Toggle for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Links and Buttons */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Manage Users Button */}
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={handleManageUsers}
            >
              Manage Users
            </Button>

            {/* Sign Out Button */}
            <Button variant="outline-danger" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
