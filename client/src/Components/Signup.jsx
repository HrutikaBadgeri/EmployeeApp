import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../Components/css/login.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Login from "./Login";
import countryList from "./countryList";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  //for dynamic changing of the countries, city and state
  const [selectedCountry, setSelectedCountry] = useState("---Country---");
  const [selectedState, setSelectedState] = useState("---State---");
  const [selectedCity, setSelectedCity] = useState("---City---");

  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  //change in country functions
  const changeCountry = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedStates(
      countryList.find((ctr) => ctr.name === event.target.value).states
    );
  };
  //change in state functions
  const changeState = (event) => {
    setSelectedState(event.target.value);
    setSelectedCities(
      selectedStates.find(
        (selectedState) => selectedState.name === event.target.value
      ).cities
    );
  };

  //change in city functions
  const changeCity = (e) => {
    setSelectedCity(e.target.value);
  };
  //setting variables for sending data to the backend
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [age, setAge] = useState();
  const [salary, setSalary] = useState();
  const [contact, setContact] = useState();
  const [gender, setGender] = useState();

  // //assigning the value to country, state and city
  // setCountry(selectedCountry);
  // setState(selectedState);
  // setCity(selectedCity);

  //to send data to the backend and navigate back to the login page
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
    obj.employeeCountry = selectedCountry;
    obj.employeeState = selectedState;
    obj.employeeCity = selectedCity;
    console.log(obj);
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
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Male/Female/Others"
              onChange={(e) => setGender(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <br />
            <select
              style={{
                width: "500px",
                height: "35px",
              }}
              className="address-dropdown"
              value={selectedCountry}
              onChange={(e) => {
                changeCountry(e);
              }}
            >
              <option>Select Country</option>
              {countryList.map((ctr) => (
                <option value={ctr.name}>{ctr.name}</option>
              ))}
            </select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <br />
            <select
              style={{
                width: "500px",
                height: "35px",
                borderRadius: "2px",
              }}
              value={selectedState}
              onChange={(e) => {
                changeState(e);
              }}
            >
              <option>Select State</option>
              {selectedStates.map((selectedState) => (
                <option value={selectedState.name}>{selectedState.name}</option>
              ))}
            </select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <br />
            <select
              style={{ width: "500px", height: "35px" }}
              value={selectedCity}
              onChange={(e) => {
                changeCity(e);
              }}
            >
              <option>Select City</option>
              {selectedCities.map((selectedCity) => (
                <option value={selectedCity}>{selectedCity}</option>
              ))}
            </select>
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
