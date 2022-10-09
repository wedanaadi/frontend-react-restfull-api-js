import axios from "axios";
import React, { useState } from "react";
import {
  Card,
  Button,
  Container,
  Form,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorsValidation, setErrorsValidation] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, {
        username,
        password,
      },{
        headers: {
          withCredentials:true,
          credentials: 'include'
        }
      });
      // localStorage.setItem('rt',btoa(response.data.data.refreshToken))
      navigate("/dashboard");
    } catch (e) {
      setErrorsValidation([]);
      setError("");
      if (e.response.status == 400) {
        setErrorsValidation(e.response.data.errors);
      } else {
        setError(e.response.data.errors);
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Login Form</Card.Title>
            </Card.Header>
            <Card.Body>
              {error ? (
                <Alert key="danger" variant="danger">
                  {error}
                </Alert>
              ) : null}
              <Form autoComplete="off" onSubmit={login}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errorsValidation.username?.map((msg, index) => (
                    <div key={index}>
                      <Form.Text className="text-danger">{msg}</Form.Text>
                    </div>
                  ))}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errorsValidation.password?.map((msg, index) => (
                    <div key={index}>
                      <Form.Text className="text-danger">{msg}</Form.Text>
                    </div>
                  ))}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
