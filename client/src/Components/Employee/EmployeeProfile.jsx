import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../css/login.css";
import { useState } from "react";
const EmployeeProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  useEffect(() => {
    (async () => await Load())();
  }, []);
  const updateUser = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/api/v1/employee/updateDetails";
    try {
      const varToken = localStorage.getItem("token");
      const res = await axios.patch(
        url,
        {
          employeeName: name,
          employeeEmail: email,
          employeeAge: age,
          employeeSalary: salary,
          employeeContact: contact,
          employeeGender: gender,
          employeeCountry: country,
          employeeState: state,
          employeeCity: city,
        },
        {
          headers: {
            Authorization: "Bearer " + varToken,
          },
        }
      );
      console.log(res);
      alert("Details updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  async function Load() {
    const varToken = localStorage.getItem("token");
    const result = await axios.get("http://localhost:3000/api/v1/employee", {
      headers: {
        Authorization: "Bearer " + varToken,
      },
    });
    const employee = result.data.data;
    setName(employee.employeeName);
    setEmail(employee.employeeEmail);
    setAge(employee.employeeAge);
    setSalary(employee.employeeSalary);
    setContact(employee.employeeContact);
    setGender(employee.employeeGender);
    setCountry(employee.employeeCountry);
    setState(employee.employeeState);
    setCity(employee.employeeCity);
    console.log(employee);
  }

  return (
    <div>
      <h3
        style={{
          fontFamily: "Poppins",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        WELCOME TO YOUR PROFILE
      </h3>
      <div className="form-div">
        <Form style={{ width: "500px" }}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gener</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Male/Female/Others"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <button
            type="submit"
            style={{ marginLeft: "200px" }}
            onClick={updateUser}
          >
            Update
          </button>
        </Form>
      </div>
    </div>
  );
};

export default EmployeeProfile;
