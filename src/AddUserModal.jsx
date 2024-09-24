// AddUserModal.js
import React, { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { API_URL } from "./constants";

const AddUserModal = ({ show, handleClose, onUserAdded }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!username || !password || !role) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (response.status === 201 || response.status === 200) {
        const newUser = await response.json();
        onUserAdded(newUser);
        handleClose();
      } else if (response.status === 400) {
        const errorData = await response.json();
        setError(errorData.message || "Bad Request.");
      } else if (response.status === 401) {
        setError("Unauthorized access. Please sign in again.");
      } else if (response.status === 403) {
        setError("Forbidden access. You do not have permission.");
      } else {
        const errorText = await response.text();
        setError(`Unexpected error: ${errorText}`);
      }
    } catch (err) {
      setError(`An error has occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    // Reset form fields and errors when closing
    setUsername("");
    setPassword("");
    setRole("user");
    setError(null);
    setLoading(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formRole" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={handleModalClose}
              className="me-2"
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Adding...
                </>
              ) : (
                "Add User"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddUserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onUserAdded: PropTypes.func.isRequired,
};

export default AddUserModal;
