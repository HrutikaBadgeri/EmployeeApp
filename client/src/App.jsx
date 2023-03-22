import "./App.css";
import Login from "./Components/Login";
import EmployeeHome from "./Components/Employee/EmployeeHome";
import Signup from "./Components/Signup";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminHome from "./Components/Admin/AdminHome";
import EmployeeProfile from "./Components/Employee/EmployeeProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

        {/* employee routes */}
        <Route exact path="employee" element={<EmployeeHome />} />
        <Route exact path="updateProfile" element={<EmployeeProfile />} />
        {/* end of employee routes */}
        <Route exact path="admin" element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
