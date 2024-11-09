import React, { useState, useEffect } from "react";
import { Modal, Spinner, Button } from "react-bootstrap";
import { Buffer } from "buffer";
import { API_URL } from "./constants";

function GraphModal({ show, handleClose, imageId, query }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && imageId) {
      fetchImage();
    }
  }, [show, imageId]);

  const fetchImage = () => {
    setLoading(true);
    console.log(query);
    const params = new URLSearchParams();
    if (query.startDate) params.append("startDate", query.startDate);
    if (query.endDate) params.append("endDate", query.endDate);
    const url = `${API_URL}/devices/humidity_graph/${imageId}?${params.toString()}`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const base64String = Buffer.from(data.data).toString("base64");
        setImageSrc(`data:image/png;base64,${base64String}`);
      })
      .catch((error) => console.error("Error fetching image:", error))
      .finally(() => setLoading(false));
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Graph</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          imageSrc && <img src={imageSrc} alt="Graph" className="img-fluid" />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GraphModal;
