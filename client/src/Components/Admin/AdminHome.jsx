import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";
const AdminHome = () => {
  //setting the value for search funtion
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [submit, setSubmit] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [searchError, setSearchError] = useState("");

  //constructor
  useEffect(() => {
    (async () => {
      await Load();
      await LoadCount();
    })();
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && submit) {
      searchEmployee();
    }
  }, [formErrors]);

  //load function
  async function Load() {
    const varToken = localStorage.getItem("token");
    const result = await axios.get("http://localhost:3000/api/v1/admin/view", {
      headers: {
        Authorization: "Bearer " + varToken,
      },
    });
    setUsers(result.data.data.emp);
  }

  //counts the number of employees in the database
  async function LoadCount() {
    const varToken = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/api/v1/admin/count", {
      headers: {
        Authorization: "Bearer " + varToken,
      },
    });
    setCount(res.data.data.count);
    //6 employees and 3 per page, 6/3 = 2 pages
  }

  //delete function
  async function DeleteEmployee(id) {
    const varToken = localStorage.getItem("token");
    await axios.delete("http://localhost:3000/api/v1/admin/delete/" + id, {
      headers: {
        Authorization: "Bearer " + varToken,
      },
    });
    alert("Employee deleted Successfully");
    Load();
  }

  //search function
  async function searchEmployee() {
    const varToken = localStorage.getItem("token");
    const res = await axios.get(
      "http://localhost:3000/api/v1/admin/view/" + value,
      {
        headers: {
          Authorization: "Bearer " + varToken,
        },
      }
    );

    if (res.data.data.emp.length === 0) {
      setSearchError("No employee found");
    } else {
      setSearchError("");
    }
    setUsers(res.data.data.emp);
  }

  //logout function
  const navigate = useNavigate();
  const adminLogout = async () => {
    try {
      const varToken = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/v1/admin/logout", {
        headers: {
          Authorization: "Bearer " + varToken,
        },
      });
      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update state to next employees function
  async function updateState(num) {
    const varToken = localStorage.getItem("token");
    const page = num;
    const res = await axios.get("http://localhost:3000/api/v1/admin/view/", {
      params: {
        p: page,
      },
      headers: {
        Authorization: "Bearer " + varToken,
      },
    });
    if (res.data.data.emp.length === 0) {
      setSearchError("No employee found");
    } else {
      setSearchError("");
    }
    setUsers(res.data.data.emp);
  }
  return (
    <div>
      <h3>Welcome to Admin Portal</h3>
      <br />
      <button onClick={adminLogout}>Logout</button>
      <br />
      <br />
      <form>
        <h6>Search an Employee: </h6>
        <input
          style={{ width: "350px" }}
          value={value}
          placeholder="Enter name or email to search"
          onChange={(e) => {
            if (!e.target.value) {
              setFormErrors((current) => {
                const { searchtext, ...rest } = current;
                return rest;
              });
            } else if (!isNaN(e.target.value)) {
              setFormErrors({
                ...formErrors,
                searchtext: "Name/Email should not be a number",
              });
            } else {
              setFormErrors((current) => {
                const { searchtext, ...rest } = current;
                return rest;
              });
            }
            setValue(e.target.value);
          }}
        />
        <button
          style={{ marginLeft: "40px", padding: "10px" }}
          onClick={(e) => {
            e.preventDefault();
            setSubmit(true);
            if (Object.keys(formErrors).length === 0 && submit) {
              searchEmployee();
            } else {
              alert("Please enter a valid value to search");
            }
          }}
        >
          Search
        </button>
        <p style={{ color: "red" }}>{formErrors.searchtext}</p>
      </form>

      <br />
      <br />
      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Emp Name</th>
            <th scope="col">Emp Email</th>
            <th scope="col">Emp Age</th>
            <th scope="col">Emp Gender</th>
            <th scope="col">Emp Contact</th>
            <th scope="col">Emp Salary</th>
            <th scope="col">Emp Country</th>
            <th scope="col">Emp City</th>
            <th scope="col">Emp State</th>
          </tr>
        </thead>
        {users.map((user) => (
          <tbody key={user.employeeEmail}>
            <tr>
              <th scope="row">{user.employeeName} </th>
              <td>{user.employeeEmail}</td>
              <td>{user.employeeAge}</td>
              <td>{user.employeeGender}</td>
              <td>{user.employeeContact}</td>
              <td>{user.employeeSalary}</td>
              <td>{user.employeeCountry}</td>
              <td>{user.employeeCity}</td>
              <td>{user.employeeState}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => DeleteEmployee(user._id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-secondary">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/adminUpdateProfile"
                    state={{ data: user._id }}
                  >
                    Update
                  </Link>
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-secondary">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/adminViewFiles"
                    state={{ data: user._id }}
                  >
                    Files
                  </Link>
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      <p>{searchError}</p>

      {Array.from({ length: Math.ceil(count / 5) }, (_, i) => i + 1).map(
        (num) => (
          <button
            key={num}
            onClick={() => {
              updateState(num);
            }}
          >
            {num}
          </button>
        )
      )}
    </div>
  );
};

export default AdminHome;
