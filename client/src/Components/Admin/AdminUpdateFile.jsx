import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import axios from "axios";
const AdminUpdateFile = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const location = useLocation();
  const { fileid, employeeid } = location.state;
  const handleChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("updatedFile", files[i]);
    }
    console.log(formData);

    const url =
      "http://localhost:3000/api/v1/admin/updateFile/" +
      employeeid +
      "/" +
      fileid;
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
          navigate("/adminViewFiles", {
            state: {
              data: employeeid,
            },
          });
        }
      }
    } catch (error) {
      alert("Cannot update file");
      console.log(error);
    }
  };
  return (
    <div>
      <h4 style={{ fontFamily: "Poppins" }}>Update file</h4>
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

export default AdminUpdateFile;
