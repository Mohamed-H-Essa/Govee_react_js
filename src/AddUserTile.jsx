// AddUserTile.js
import React from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const AddUserTile = ({ onAdd }) => {
  return (
    <Card className="h-100 text-center bg-light">
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <Card.Title>Add New User</Card.Title>
        <Button variant="success" onClick={onAdd}>
          <i className="bi bi-plus-lg me-2"></i> Add User
        </Button>
      </Card.Body>
    </Card>
  );
};

AddUserTile.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddUserTile;
