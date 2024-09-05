import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  InputGroup,
  DropdownButton,
  Dropdown,
  Badge,
  Spinner,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { API_URL } from "./constants";

const InjectionPage = () => {
  const location = useLocation();
  const injectedDevicesIds = location.state?.devicesInjectedIds || [];
  const [injections, setInjections] = useState([]);
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [type, setType] = useState("Temperature");
  const [rangeFrom, setRangeFrom] = useState("");
  const [rangeTo, setRangeTo] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid =
    fromTime &&
    toTime &&
    rangeFrom !== "" &&
    rangeTo !== "" &&
    rangeFrom < rangeTo;

  useEffect(() => {
    const fetchInjections = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/injections`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch injections");
        }

        console.log("Fetched injections:", data);
        setInjections(data); // Assuming the data is an array of injections
      } catch (error) {
        console.error("Error fetching injections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInjections();
  }, []);

  const handleAddInjection = () => {
    const newInjection = {
      deviceIds: injectedDevicesIds,
    };

    if (fromTime) {
      const date = new Date(fromTime);
      const localDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60000
      );
      newInjection.timeStart = localDate;
    }
    if (toTime) {
      const date = new Date(toTime);
      const localDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60000
      );
      newInjection.timeEnd = localDate;
    }

    if (type === "Temperature") {
      newInjection.tempMin = Number(rangeFrom);
      newInjection.tempMax = Number(rangeTo);
    } else if (type === "Humidity") {
      newInjection.humidityMin = Number(rangeFrom);
      newInjection.humidityMax = Number(rangeTo);
    }
    console.log(JSON.stringify(newInjection));
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h3>Add Injection</h3>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="fromTime">
              <Form.Label column sm={2}>
                From Time
              </Form.Label>
              <Col sm={10}>
                <DatePicker
                  selected={fromTime}
                  onChange={(date) => setFromTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="form-control"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="toTime">
              <Form.Label column sm={2}>
                To Time
              </Form.Label>
              <Col sm={10}>
                <DatePicker
                  selected={toTime}
                  onChange={(date) => setToTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="form-control"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="type">
              <Form.Label column sm={2}>
                Type
              </Form.Label>
              <Col sm={10}>
                <InputGroup style={{ zIndex: 0 }}>
                  <DropdownButton
                    variant="outline-secondary"
                    title={type}
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item onClick={() => setType("Temperature")}>
                      Temperature
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setType("Humidity")}>
                      Humidity
                    </Dropdown.Item>
                  </DropdownButton>
                </InputGroup>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="range">
              <Form.Label column sm={2}>
                Range From/To
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="number"
                  placeholder="Range From"
                  value={rangeFrom}
                  onChange={(e) => setRangeFrom(e.target.value)}
                />
              </Col>
              <Col sm={5}>
                <Form.Control
                  type="number"
                  placeholder="Range To"
                  value={rangeTo}
                  onChange={(e) => setRangeTo(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleAddInjection}
              disabled={!isFormValid} // Disable the button if form is not valid
            >
              Add Injection
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3>View Injections</h3>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>From Time</th>
                  <th>To Time</th>
                  <th>Type</th>
                  <th>Range From</th>
                  <th>Range To</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {injections.map((injection) => (
                  <tr key={injection.id}>
                    <td>{injection.id}</td>
                    <td>{new Date(injection.fromTime).toLocaleString()}</td>
                    <td>{new Date(injection.toTime).toLocaleString()}</td>
                    <td>{injection.type}</td>
                    <td>{injection.rangeFrom}</td>
                    <td>{injection.rangeTo}</td>
                    <td>
                      {injection.active ? (
                        <Badge bg="success">Active</Badge>
                      ) : (
                        <Badge bg="secondary">Inactive</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default InjectionPage;
