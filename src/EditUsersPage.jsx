// ManageUsersPage.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import UserCard from "./UserCard";
import AddUserTile from "./AddUserTile";
import AddUserModal from "./AddUserModal"; // Import the AddUserModal component
import { API_URL } from "./constants";

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false); // State for modal visibility

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 401) {
        setError("Unauthorized access. Please sign in and try again.");
        setLoading(false);
        return;
      }

      if (response.status === 403) {
        setError("Forbidden access. Admin access only!");
        setLoading(false);
        return;
      }

      if (response.status === 200) {
        const data = await response.json();
        setUsers(data);
        setLoading(false);
        return;
      }

      // Handle other unexpected statuses
      const errorData = await response.text();
      setError(`Unexpected error: ${errorData}`);
      setLoading(false);
    } catch (err) {
      setError(`An error has occurred: ${err.message}`);
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit user with id: ${id}`);
    // Implement your edit logic here
  };

  const handleAddUserClick = () => {
    setShowAddUserModal(true);
  };

  const handleAddUserClose = () => {
    setShowAddUserModal(false);
  };

  const handleUserAdded = (newUser) => {
    // Option 1: Refetch the users list
    // fetchUsers();

    // Option 2: Optimistically add the new user to the list
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Manage Users</h1>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {users.map((user) => (
            <Col key={user.id}>
              <UserCard user={user} onEdit={handleEdit} />
            </Col>
          ))}
          <Col>
            <AddUserTile onAdd={handleAddUserClick} />
          </Col>
        </Row>
      )}

      {/* AddUserModal Component */}
      <AddUserModal
        show={showAddUserModal}
        handleClose={handleAddUserClose}
        onUserAdded={handleUserAdded}
      />
    </Container>
  );
};

export default ManageUsersPage;
