import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../css/login.css";
import { useState } from "react";
const EmployeeProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [authToken, setAuthToken] = useState("");
  const [submit, setSubmit] = useState(false);
  //for loading countries from the API
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  //load the set of countries from the API
  useEffect(() => {
    (async () => {
      const API_KEY = import.meta.env.VITE_COUNTRY_API_KEY;
      const auth_token_res = await axios.get(
        "https://www.universal-tutorial.com/api/getaccesstoken",
        {
          headers: {
            "api-token": API_KEY,
            "user-email": "hrutika567@gmail.com",
            Accept: "application/json",
          },
        }
      );
      //country
      const auth_token = auth_token_res.data.auth_token;
      setAuthToken(auth_token);
      const country_res = await axios.get(
        "https://www.universal-tutorial.com/api/countries/",
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
            Accept: "application/json",
          },
        }
      );
      setCountries(country_res.data);
    })();
  }, []);

  //get the country-cistate data from the API
  const newStates = async (country) => {
    if (country) {
      const state_res = await axios.get(
        "https://www.universal-tutorial.com/api/states/" + country,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      );
      setStates(state_res.data);
    } else {
      setStates([]);
    }
  };

  //load the set of cities from the API
  const newCities = async (state) => {
    if (state) {
      const city_res = await axios.get(
        "https://www.universal-tutorial.com/api/cities/" + state,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      );
      setCities(city_res.data);
    } else {
      setCities([]);
    }
  };

  useEffect(() => {
    newStates(selectedCountry);
    newCities(selectedState);
  }, [authToken, selectedCountry, selectedState]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  //update user function
  const updateUser = async () => {
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
          employeeCountry: selectedCountry,
          employeeState: selectedState,
          employeeCity: selectedCity,
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
      alert("Error in updating details");
      console.log(error);
    }
  };

  //load the user details from the database
  async function Load() {
    const varToken = localStorage.getItem("token");
    const result = await axios.get("http://localhost:3000/api/v1/employee", {
      headers: {
        Authorization: "Bearer " + varToken,
      },
    });
    //gets data from the backend and assigns it to the variables
    const employee = result.data.data;
    setName(employee.employeeName);
    setEmail(employee.employeeEmail);
    setAge(employee.employeeAge);
    setSalary(employee.employeeSalary);
    setContact(employee.employeeContact);
    setGender(employee.employeeGender);
    setSelectedCountry(employee.employeeCountry);
    setSelectedState(employee.employeeState);
    setSelectedCity(employee.employeeCity);
  }

  const validate = () => {
    let errors = {};

    // Validate name
    if (!name) {
      errors.username = "Name is required";
    } else if (!isNaN(name)) {
      errors.username = "Name should not be a number";
    } else if (name.length > 20) {
      errors.username = "Name should be less than 20 characters";
    }

    // Validate email
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
      errors.useremail = "Email is required";
    } else if (!regexEmail.test(email)) {
      errors.useremail = "Invalid email format";
    } else if (email.length < 4) {
      errors.useremail = "Email should be greater than 4 characters";
    } else if (email.length > 30) {
      errors.useremail = "Email should be less than 30 characters";
    }

    // Validate age
    if (!age) {
      errors.userage = "Age is required";
    } else if (age < 10) {
      errors.userage = "Age should be greater than 10";
    } else if (age > 100) {
      errors.userage = "Age should be less than 100";
    } else if (isNaN(age)) {
      errors.userage = "Age should be a number";
    } else if (age === 0) {
      errors.userage = "Age should not be 0";
    } else if (age === null) {
      errors.userage = "Age should not be null";
    }

    // Validate salary
    if (!salary) {
      errors.usersalary = "Salary is required";
    } else if (isNaN(salary)) {
      errors.usersalary = "Salary should be a number";
    }

    // Validate contact
    const regexContact = /^(0|91)?[6-9][0-9]{9}$/;
    if (!contact) {
      errors.usercontact = "Contact is required";
    } else if (isNaN(contact)) {
      errors.usercontact = "Contact should be a number";
    } else if (!regexContact.test(contact)) {
      errors.usercontact = "Invalid contact format";
    }

    // Validate gender
    if (!gender) {
      errors.usergender = "Gender is required";
    }

    //validate country
    if (!selectedCountry) {
      errors.usercountry = "Country is required";
    }

    //validate state
    if (!selectedState) {
      errors.userstate = "State is required";
    }

    //validate city
    if (!selectedCity) {
      errors.usercity = "City is required";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && submit) {
      updateUser();
    }
  }, [formErrors]);
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
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                if (!e.target.value) {
                  setFormErrors({
                    ...formErrors,
                    username: "Name is required",
                  });
                } else if (!isNaN(e.target.value)) {
                  setFormErrors({
                    ...formErrors,
                    username: "Name should not be a number",
                  });
                } else if (e.target.value.length > 20) {
                  setFormErrors({
                    ...formErrors,
                    username: "Name should be less than 20 characters",
                  });
                } else {
                  setFormErrors({ ...formErrors, username: "" });
                }
                setName(e.target.value);
              }}
            />
            <p style={{ color: "red" }}>{formErrors.username}</p>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                const regexEmail =
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!e.target.value) {
                  setFormErrors({
                    ...formErrors,
                    useremail: "Email is required",
                  });
                } else if (!regexEmail.test(e.target.value)) {
                  setFormErrors({
                    ...formErrors,
                    useremail: "Invalid email format",
                  });
                } else if (e.target.value.length < 4) {
                  setFormErrors({
                    ...formErrors,
                    useremail: "Email should be greater than 4 characters",
                  });
                } else if (e.target.value.length > 30) {
                  setFormErrors({
                    ...formErrors,
                    useremail: "Email should be less than 30 characters",
                  });
                } else {
                  setFormErrors({ ...formErrors, useremail: "" });
                }
                setEmail(e.target.value);
              }}
            />
            <p style={{ color: "red" }}>{formErrors.useremail}</p>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => {
                if (!e.target.value) {
                  setFormErrors({
                    ...formErrors,
                    userage: "Age is required",
                  });
                } else if (e.target.value < 10) {
                  setFormErrors({
                    ...formErrors,
                    userage: "Age should be greater than 10",
                  });
                } else if (e.target.value > 100) {
                  setFormErrors({
                    ...formErrors,
                    userage: "Age should be less than 100",
                  });
                } else if (isNaN(e.target.value)) {
                  setFormErrors({
                    ...formErrors,
                    userage: "Age should be a number",
                  });
                } else if (e.target.value === 0) {
                  setFormErrors({
                    ...formErrors,
                    userage: "Age should not be 0",
                  });
                } else if (e.target.value === null) {
                  setFormErrors({
                    ...formErrors,
                    userage: "Age should not be null",
                  });
                } else {
                  setFormErrors({ ...formErrors, userage: "" });
                }
                setAge(e.target.value);
              }}
            />
            <p style={{ color: "red" }}>{formErrors.userage}</p>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) => {
                if (!e.target.value) {
                  setFormErrors({
                    ...formErrors,
                    usersalary: "Salary is required",
                  });
                } else if (isNaN(e.target.value)) {
                  setFormErrors({
                    ...formErrors,
                    usersalary: "Salary should be a number",
                  });
                } else {
                  setFormErrors({ ...formErrors, usersalary: "" });
                }
                setSalary(e.target.value);
              }}
            />
            <p style={{ color: "red" }}>{formErrors.usersalary}</p>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contact number"
              value={contact}
              onChange={(e) => {
                const regexContact = /^(0|91)?[6-9][0-9]{9}$/;
                if (!e.target.value) {
                  setFormErrors({
                    ...formErrors,
                    usercontact: "Contact is required",
                  });
                } else if (isNaN(e.target.value)) {
                  setFormErrors({
                    ...formErrors,
                    usercontact: "Contact should be a number",
                  });
                } else if (!regexContact.test(e.target.value)) {
                  setFormErrors({
                    ...formErrors,
                    usercontact: "Invalid contact format",
                  });
                } else {
                  setFormErrors({ ...formErrors, usercontact: "" });
                }

                setContact(e.target.value);
              }}
            />
            <p style={{ color: "red" }}>{formErrors.usercontact}</p>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <br />
            <select
              style={{
                width: "500px",
                height: "35px",
              }}
              type="text"
              value={gender}
              placeholder="Enter Male/Female/Others"
              onChange={(e) => {
                setGender(e.target.value);
                if (!e.target.value) {
                  setFormErrors({
                    ...formErrors,
                    usergender: "Country is required",
                  });
                } else {
                  setFormErrors({ ...formErrors, usergender: "" });
                }
              }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <p style={{ color: "red" }}>{formErrors.usergender}</p>
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
                setSelectedCountry(e.target.value);
                newStates(e.target.value);
                if (!e.target.value) {
                  setFormErrors({
                    ...formErrors,
                    usercountry: "Country is required",
                  });
                } else {
                  setFormErrors({ ...formErrors, usercountry: "" });
                }
              }}
            >
              <option value="">Select Country</option>
              {countries.map((country) => {
                return (
                  <option
                    key={country.country_name}
                    value={country.country_name}
                  >
                    {country.country_name}
                  </option>
                );
              })}
            </select>
            <p style={{ color: "red" }}>{formErrors.usercountry}</p>
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
                setSelectedState(e.target.value);
                newCities(e.target.value);
                if (!e.target.value) {
                  setFormErrors({
                    ...formErrors,
                    userstate: "State is required",
                  });
                } else {
                  setFormErrors({ ...formErrors, userstate: "" });
                }
              }}
            >
              <option value="">Select State</option>
              {states.map((state) => {
                if (state.state_name == selectedState) {
                  return (
                    <option
                      key={state.state_name}
                      value={state.state_name}
                      selected
                    >
                      {state.state_name}
                    </option>
                  );
                }
                return (
                  <option key={state.state_name} value={state.state_name}>
                    {state.state_name}
                  </option>
                );
              })}
            </select>
            <p style={{ color: "red" }}>{formErrors.userstate}</p>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <br />
            <select
              style={{ width: "500px", height: "35px" }}
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                if (!e.target.value) {
                  setFormErrors({
                    ...formErrors,
                    usercity: "City is required",
                  });
                } else {
                  setFormErrors({ ...formErrors, usercity: "" });
                }
              }}
            >
              <option value="">Select City</option>
              {cities.map((city) => {
                if (city.city_name == selectedCity) {
                  return (
                    <option
                      key={city.city_name}
                      value={city.city_name}
                      selected
                    >
                      {city.city_name}
                    </option>
                  );
                }
                return (
                  <option key={city.city_name} value={city.city_name}>
                    {city.city_name}
                  </option>
                );
              })}
            </select>
            <p style={{ color: "red" }}>{formErrors.usercity}</p>
          </Form.Group>

          <button
            type="submit"
            style={{ marginLeft: "200px" }}
            onClick={(e) => {
              e.preventDefault();
              setFormErrors(validate());
              setSubmit(true);
            }}
          >
            Update
          </button>
        </Form>
      </div>
    </div>
  );
};

export default EmployeeProfile;
