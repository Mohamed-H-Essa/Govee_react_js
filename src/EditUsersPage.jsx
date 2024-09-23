import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import UserCard from "./UserCard";
import AddUserTile from "./AddUserTile";
import { API_URL } from "./constants";

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
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

    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit user with id: ${id}`);
    // Implement your edit logic here
  };

  const handleAddUser = () => {
    console.log("Add new user");
    // Implement your add user logic here
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
            <AddUserTile onAdd={handleAddUser} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ManageUsersPage;
