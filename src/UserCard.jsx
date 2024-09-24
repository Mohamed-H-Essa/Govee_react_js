// UserCard.js
import React from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const UserCard = ({ user, onEdit }) => {
  const { id, username, role } = user;

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Role: {role.charAt(0).toUpperCase() + role.slice(1)}
        </Card.Subtitle>
        {/* <div className="mt-auto">
          <Button variant="primary" onClick={() => onEdit(id)}>
            Edit
          </Button>
        </div> */}
      </Card.Body>
    </Card>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default UserCard;
