import "./App.css";
import Login from "./Components/Login";
import EmployeeHome from "./Components/Employee/EmployeeHome";
import Signup from "./Components/Signup";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminHome from "./Components/Admin/AdminHome";
import EmployeeProfile from "./Components/Employee/EmployeeProfile";
import EmployeeUploadFile from "./Components/Employee/EmployeeUploadFile";
import EmployeeUpdateFile from "./Components/Employee/EmployeeUpdateFile";
import AdminUpdateProfile from "./Components/Admin/AdminUpdateProfile";
import AdminViewFiles from "./Components/Admin/AdminViewFiles";
import AdminUpdateFile from "./Components/Admin/AdminUpdateFile";
import AdminPreviewFile from "./Components/Admin/AdminPreviewFile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

        {/* employee routes */}
        <Route exact path="employee/view" element={<EmployeeHome />} />
        <Route exact path="updateProfile" element={<EmployeeProfile />} />
        <Route exact path="uploadFile" element={<EmployeeUploadFile />} />
        <Route exact path="updateFile" element={<EmployeeUpdateFile />} />
        {/* end of employee routes */}

        {/* admin routes */}
        <Route exact path="/admin/view" element={<AdminHome />} />
        <Route
          exact
          path="adminUpdateProfile"
          element={<AdminUpdateProfile />}
        />
        <Route exact path="adminViewFiles" element={<AdminViewFiles />} />
        <Route exact path="adminUpdateFile" element={<AdminUpdateFile />} />
        <Route exact path="adminPreviewFile" element={<AdminPreviewFile />} />
        {/* end of admin routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
