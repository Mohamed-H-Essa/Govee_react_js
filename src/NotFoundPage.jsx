// NotFoundPage.js
import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import notFoundImage from "./assets/404.png"; // Optional: Add a 404 image in your assets

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/login");
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      {/* Optional: Display a 404 image */}
      {/* <Image src={notFoundImage} alt="404 Not Found" width={300} className="mb-4" /> */}

      <Row className="text-center">
        <Col>
          <h1 className="display-4">404</h1>
          <p className="lead">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button variant="primary" onClick={handleGoHome}>
            Go to Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
