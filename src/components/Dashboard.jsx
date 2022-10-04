import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { Container, Button, Table } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expiredToken, setExpiredToken] = useState("");
  const [employees, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/token`,
        {
          headers: {
            refreshtoken: localStorage.getItem("rt"),
          },
        }
      );
      setToken(response.data.data.token);
      const decode = jwt_decode(response.data.data.token);
      setName(decode.fullname);
      setExpiredToken(decode.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expiredToken * 1000 < currentDate.getTime()) {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/auth/token`,
          {
            headers: {
              refreshtoken: localStorage.getItem("rt"),
            },
          }
        );
        config.headers.Authorization = `Bearer ${response.data.data.token}`;
        setToken(response.data.token);
        const decode = jwt_decode(response.data.data.token);
        setName(decode.fullname);
        setExpiredToken(decode.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getEmploye = async () => {
    try {
      const response = await axiosJWT.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/employe`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployee(response.data.data.rows);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  return (
    <>
      <Menu />
      <Container className="mt-5">
        <div>Wellcome : {name}</div>
        <Button onClick={getEmploye} variant="info" className="mt-3">
          Get Employee
        </Button>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{employee.employe_name}</td>
                <td>{employee.employe_role}</td>
                <td>{employee.employe_phone_number}</td>
                <td>{employee.employe_address}</td>
                <td>
                  {new Date(parseInt(employee.createdAt)).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Dashboard;
