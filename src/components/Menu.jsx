import axios from "axios";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate()
  const logout = async() => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/logout`)
      // localStorage.removeItem("rt")
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={logout}>Log Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
