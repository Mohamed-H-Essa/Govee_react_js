import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row>
        <Col className="text-center">
          <h1 className="display-4 text-danger mb-4">Unauthorized Access</h1>
          <p className="lead mb-4">
            Sorry, you are not authorized to access this page.
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UnauthorizedPage;
