import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AdminViewFiles = () => {
  const [userFiles, setUserFiles] = useState([]);
  const location = useLocation();
  const { data } = location.state;
  console.log(data);

  useEffect(() => {
    (async () => {
      await Load();
    })();
  }, []);

  async function Load() {
    const varToken = localStorage.getItem("token");
    let url = "http://localhost:3000/api/v1/admin/viewFiles/" + data;
    const result = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + varToken,
      },
    });

    setUserFiles(result.data.data);
  }
  const deleteFile = async (id) => {
    try {
      const varToken = localStorage.getItem("token");
      const url =
        "http://localhost:3000/api/v1/admin/deleteFile/" + data + "/" + id;
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
      <h4 style={{ fontFamily: "Poppins" }}>Files Portal</h4>
      <h6>Files</h6>
      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">File Names</th>
          </tr>
        </thead>
        {userFiles.map((file) => {
          return (
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
                      to="/adminUpdateFile"
                      state={{ fileid: file._id, employeeid: data }}
                    >
                      Update
                    </Link>
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-secondary">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/adminPreviewFile"
                      state={{ data: file }}
                    >
                      Preview
                    </Link>
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default AdminViewFiles;
