import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const EmployeeUploadFile = () => {
  const [files, setFiles] = useState([]);
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    (async () => {
      await Load();
    })();
  }, []);

  async function Load() {
    const varToken = localStorage.getItem("token");
    let url = "http://localhost:3000/api/v1/employee/viewFiles";
    const result = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + varToken,
      },
    });

    setUserFiles(result.data.data);
  }

  const handleChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    console.log("Hello");
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("employeeFiles", files[i]);
    }
    console.log(formData);
    try {
      const varToken = localStorage.getItem("token");
      let url = "http://localhost:3000/api/v1/employee/upload";
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + varToken,
        },
      });

      console.log(response.data.data);
      alert("Files uploaded successfully");
      Load();
    } catch (error) {
      alert("Can't upload files");
      console.error(error);
    }
  };

  const deleteFile = async (id) => {
    try {
      const varToken = localStorage.getItem("token");
      const url = "http://localhost:3000/api/v1/employee/deleteFile/" + id;
      await axios.delete(url, {
        headers: {
          Authorization: "Bearer " + varToken,
        },
      });
      alert("File deleted successfully");
      Load();
    } catch (err) {
      alert("Cannot delete file");
      console.log(err);
    }
  };
  return (
    <div>
      <form encType="multipart/form-data">
        <input
          name="employeeFiles"
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
            handleUpload();
          }}
        >
          Upload
        </button>
      </form>
      <br />
      <h6>Your uploaded files</h6>
      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">File Names</th>
          </tr>
        </thead>
        {userFiles.map((file) => (
          <tbody key={file.name}>
            <tr>
              <th scope="row">{file.name} </th>
              <td>{file.name}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteFile(file._id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-secondary">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/updateFile"
                    state={{ data: file._id }}
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

export default EmployeeUploadFile;
