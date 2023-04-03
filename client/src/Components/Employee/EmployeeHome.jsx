import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";

const EmployeeHome = () => {
  const navigate = useNavigate();
  const employeeLogout = async () => {
    try {
      const varToken = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:3000/api/v1/employee/logout",
        {
          headers: {
            Authorization: "Bearer " + varToken,
          },
        }
      );
      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {
      alert("Logout Unsuccessful");
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Welcome to Employee Portal</h3>
      <div style={{ position: "relative", margin: "auto" }}>
        <button onClick={employeeLogout}>Logout</button>

        <Link to="/updateProfile">
          <button style={{ marginLeft: "50px" }}>Update Profile</button>
        </Link>

        <Link to="/uploadFile">
          <button style={{ marginLeft: "50px" }}>Upload File</button>
        </Link>
      </div>
    </div>
  );
};
export default EmployeeHome;
