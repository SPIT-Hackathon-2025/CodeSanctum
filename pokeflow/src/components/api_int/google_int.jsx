import { useEffect, useState } from "react";

const Google_int = () => {
  const [emails, setEmails] = useState([]);
  const [authUrl, setAuthUrl] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/auth/google")
      .then((res) => res.json())
      .then((data) => setAuthUrl(data.url));
  }, []);

  const fetchEmails = () => {
    fetch("http://localhost:5000/emails")
      .then((res) => res.json())
      .then((data) => setEmails(data));
  };

  const fetchAttachments = (emailId) => {
    fetch(`http://localhost:5000/emails/${emailId}/attachments`)
      .then((res) => res.json())
      .then((data) => console.log("Attachments:", data));
  };

  return (
    <div>
      <h1 className="text-white">Email to Drive Automation</h1>
      <a href={authUrl}>
        <button>Login with Google</button>
      </a>
      <button onClick={fetchEmails}>Fetch Unread Emails</button>

      {emails.map((email) => (
        <div key={email.id}>
          <p>Email ID: {email.id}</p>
          <button style={{ color: "blue" }} onClick={() => fetchAttachments(email.id)}>
            Fetch Attachments
          </button>
        </div>
      ))}
    </div>
  );
};

export default Google_int;
