import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const EmployeeUpdateFile = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const location = useLocation();
  const { data } = location.state;
  console.log(data);
  const handleChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("updatedFile", files[i]);
    }
    console.log(formData);
    console.log(data);
    const url = "http://localhost:3000/api/v1/employee/updateFile/" + data;
    try {
      const varToken = localStorage.getItem("token");
      console.log(varToken);
      const res = await axios.patch(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + varToken,
        },
      });
      console.log(res);
      if (res) {
        console.log("Hi");
        alert("File updated successfully");
        if (res.data.success) {
          navigate("/uploadFile");
        }
      }
    } catch (error) {
      alert("Cannot update file");
      console.log(error);
    }
  };
  return (
    <div>
      <h4 style={{ fontFamily: "Poppins" }}>Update your file</h4>
      <form encType="multipart/form-data">
        <input
          name="updatedFile"
          type="file"
          multiple
          onChange={handleChange}
        />
        <br />
        <br />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EmployeeUpdateFile;
