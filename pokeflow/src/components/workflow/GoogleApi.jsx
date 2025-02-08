export const fetchEmails = async (accessToken) => {
    try {
        const response = await fetch("https://www.googleapis.com/gmail/v1/users/me/messages", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return data.messages || [];
    } catch (error) {
        console.error("Error fetching emails:", error);
        return [];
    }
};

export const sendEmail = async (accessToken, to, subject, body) => {
    try {
        const message = `To: ${to}\r\nSubject: ${subject}\r\n\r\n${body}`;
        const encodedMessage = btoa(message).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

        const response = await fetch("https://www.googleapis.com/gmail/v1/users/me/messages/send", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ raw: encodedMessage }),
        });

        if (!response.ok) throw new Error("Failed to send email");
        return await response.json();
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export const uploadToDrive = async (accessToken, file) => {
    try {
        const metadata = {
            name: file.name,
            mimeType: file.type,
        };

        const formData = new FormData();
        formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        formData.append("file", file);

        const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        });

        if (!response.ok) throw new Error("Failed to upload file");
        return await response.json();
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};
