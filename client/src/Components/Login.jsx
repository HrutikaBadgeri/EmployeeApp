import Form from "react-bootstrap/Form";
import axios from "axios";
import "../Components/css/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const userLogin = async (name) => {
    let url = `http://localhost:3000/api/v1/${name}/login`;
    let obj = {};
    if (name == "admin") {
      obj.adminEmail = email;
      obj.adminPassword = password;
    } else {
      obj.employeeEmail = email;
      obj.employeePassword = password;
    }

    try {
      const res = await axios.post(url, obj);
      console.log(res);
      localStorage.setItem("token", res.data.token);
      if (res.data.success) {
        navigate("/" + `${name}`);
      }
    } catch (error) {
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
        LOGIN PORTAL
      </h3>
      <br />
      <div className="form-div">
        <Form>
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
        </Form>
        <br />
        <div
          style={{
            justifyContent: "space-evenly",
            position: "relative",
          }}
        >
          <button
            onClick={() => {
              userLogin("employee");
            }}
          >
            Employee Login
          </button>
          <button onClick={() => userLogin("admin")}>Admin Login</button>
          <br />
          <p>
            Don't have an account?
            <Link to="/signup">
              <p>Signup</p>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
