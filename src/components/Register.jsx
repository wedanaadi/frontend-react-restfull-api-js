import axios from "axios";
import React, { useState } from "react";
import { Card, Button, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const saveRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`,
        {
          username,
          password,
          fullname,
        }
      );
      navigate("/")
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Register Form</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form autoComplete="off" onSubmit={saveRegister}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.map((error, index) =>
                    error.param == "username" ? (
                      <Form.Text key={index} className="text-danger">
                        {error.msg}
                      </Form.Text>
                    ) : null
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors.map((error, index) =>
                    error.param == "fullname" ? (
                      <Form.Text key={index} className="text-danger">
                        {error.msg}
                      </Form.Text>
                    ) : null
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.map((error, index) =>
                    error.param == "password" ? (
                      <Form.Text key={index} className="text-danger">
                        {error.msg}
                      </Form.Text>
                    ) : null
                  )}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
