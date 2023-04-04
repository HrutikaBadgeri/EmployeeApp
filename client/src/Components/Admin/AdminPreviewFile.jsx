import React from "react";
import { useLocation } from "react-router-dom";
const AdminPreviewFile = () => {
  const location = useLocation();
  const { data } = location.state;

  //convert the image buffer data into base64
  const base64 = btoa(
    new Uint8Array(data.data.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  const url = `data:${data.contentType};base64,${base64}`;

  //for pdf files
  const downloadFile = () => {
    const uint8Array = new Uint8Array(data.data.data);
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "example.pdf";
    link.click();
  };
  if (data.contentType === "application/pdf") {
    return (
      <div>
        <button onClick={downloadFile}>Download PDF</button>
      </div>
    );
  } else {
    return (
      <div>
        <img src={url} alt="#" />
      </div>
    );
  }
};

export default AdminPreviewFile;
