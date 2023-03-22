import React from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../Components/css/login.css";
import Login from "./Login";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [selectedcountry, setSelectedCountry] = useState("");
  const [selectedstate, setSelectedState] = useState("");
  const [selectedcity, setSelectedCity] = useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [age, setAge] = useState();
  const [salary, setSalary] = useState();
  const [contact, setContact] = useState();
  const [gender, setGender] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();

  const navigate = useNavigate();
  const registerUser = async () => {
    let url = "http://localhost:3000/api/v1/employee/signup";
    let obj = {};
    obj.employeeName = name;
    obj.employeeEmail = email;
    obj.employeePassword = password;
    obj.employeeAge = age;
    obj.employeeSalary = salary;
    obj.employeeContact = contact;
    obj.employeeGender = gender;
    obj.employeeCountry = country;
    obj.employeeState = state;
    obj.employeeCity = city;
    console.log(obj);
    // JSON.stringify(obj);
    if (obj.employeeAge < 10) {
      alert("Age must be greater than 10 years.");
      return;
    }
    if (obj.employeeContact.toString().length > 10) {
      alert("Contact number should not exceed 10 digits");
    }
    try {
      const res = await axios.post(url, obj);
      console.log(res);

      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {
      alert("Email already in use");
      console.log(error);
    }
  };
  return (
    <div>
      <h3
        style={{
          fontFamily: "Poppins",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        SIGNUP PORTAL
      </h3>
      <br />
      <div className="form-div">
        <Form style={{ width: "500px" }}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="number"
              placeholder="Salary"
              onChange={(e) => setSalary(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contact number"
              onChange={(e) => setContact(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gener</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Male/Female/Others"
              onChange={(e) => setGender(e.target.value)}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Country"
              value={selectedCountry}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group> */}
          <Form.Group as={Col} controlId="formGridCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              as="select"
              value={country}
              onChange={(e) => {
                handleCountryChange, setCountry(e.target.value);
              }}
            >
              <option>Select Country</option>
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="china">China</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <button
            style={{ marginLeft: "200px" }}
            onClick={(e) => {
              e.preventDefault();
              registerUser();
            }}
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
