import axios from "axios";

// Gmail API Base URL
const GMAIL_API_URL = "https://www.googleapis.com/gmail/v1/users/me";

// Function to fetch unread emails with attachments
export const fetchEmails = async (accessToken) => {
    try {
        const response = await axios.get(`${GMAIL_API_URL}/messages`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { q: "is:unread has:attachment" }, // Only unread emails with attachments
        });

        if (!response.data?.messages || response.data.messages.length === 0) {
            console.log("No new emails with attachments.");
            return [];
        }

        // Fetch full details for each email
        const emails = await Promise.all(
            response.data.messages.map(async (msg) => {
                const emailData = await axios.get(`${GMAIL_API_URL}/messages/${msg.id}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                const parts = emailData.data?.payload?.parts || [];
                const attachments = parts
                    .filter((part) => part.body?.attachmentId)
                    .map((part) => ({
                        id: part.body.attachmentId,
                        filename: part.filename,
                        mimeType: part.mimeType,
                    }));

                return { id: msg.id, attachments };
            })
        );

        return emails;
    } catch (error) {
        console.error("Error fetching emails:", error.response?.data || error.message);
        return [];
    }
};

// Function to download an attachment
export const downloadAttachment = async (accessToken, messageId, attachmentId, filename) => {
    try {
        const response = await axios.get(`${GMAIL_API_URL}/messages/${messageId}/attachments/${attachmentId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.data?.data) {
            console.error("No attachment data found.");
            return;
        }

        // Decode Base64 safely (Fix for large attachments)
        const byteCharacters = atob(response.data.data.replace(/-/g, "+").replace(/_/g, "/"));
        const byteNumbers = new Array(byteCharacters.length)
            .fill(0)
            .map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/octet-stream" });

        // Create a link element and trigger download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("Attachment downloaded:", filename);
    } catch (error) {
        console.error("Error downloading attachment:", error.response?.data || error.message);
    }
};
