import React, { useState } from "react";
import axios from "axios";

const GmailAttachmentViewer = () => {
  const [fileUrl, setFileUrl] = useState("");

  const fetchAttachment = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-attachment");
      alert(response.data.message);
      setFileUrl(`http://localhost:5000/downloads/${response.data.filename}`);
    } catch (error) {
      console.error("Error fetching attachment", error);
    }
  };

  return (
    <div className="text-white">
      <h2>Gmail Attachment Viewer</h2>
      <button onClick={fetchAttachment}>Download Attachment</button>
      {fileUrl && (
        <div>
          <h3>Downloaded File:</h3>
          <a href={fileUrl} download>
            {fileUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default GmailAttachmentViewer;
