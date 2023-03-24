import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";
const AdminHome = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {
    const result = await axios.get("http://localhost:3000/api/v1/admin/view");
    setUsers(result.data.data.emp);
    console.log(result.data);
  }
  async function DeleteEmployee(id) {
    await axios.delete("http://localhost:3000/api/v1/admin/delete/" + id);
    alert("Employee deleted Successfully");
    Load();
  }
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

  return (
    <div>
      <h3>Welcome to Admin Portal</h3>
      <button onClick={adminLogout}>Logout</button>
      <table class="table table-dark" align="center">
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
          <tbody>
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
                  class="btn btn-danger"
                  onClick={() => DeleteEmployee(user._id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-secondary">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/adminUpdateProfile"
                  >
                    Update
                  </Link>
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default AdminHome;
