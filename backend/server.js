// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const productRoutes = require('./routes/productRoutes');
// const app = express();
// const { authenticate } = require('./middlewares/auth');

// // Allow requests from specific origin (frontend domain)
// // const allowedOrigins = ['https://shree-vidya-saraswati-pujan.netlify.app'];
// const allowedOrigins = ['https://localhost'];
// app.use(cors({
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       // console.log("errorrrr...")
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// app.use(express.json());
// app.get('/', (req, res) => {
//   res.send('Welcome to the Mastermind Server.');
// });


// app.use('/api/products', authenticate, productRoutes);


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// //Following code for running the server on specific network i.e. IP
// // app.listen(PORT, '10.112.9.12', () => {
// //     console.log(`Server running on port ${PORT}`);
// //   });
const express = require("express");
const { google } = require("googleapis");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const KEY_PATH = "./credentials.json"; // Ensure this path is correct

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_PATH, // This should point to the downloaded credentials.json
  scopes: SCOPES,
});

const gmail = google.gmail({ version: "v1", auth });

// Fetch latest email with an attachment
app.get("/get-attachment", async (req, res) => {
  try {
    const messages = await gmail.users.messages.list({
      userId: "me",
      maxResults: 1,
    });

    if (!messages.data.messages) {
      return res.status(404).json({ message: "No emails found" });
    }

    const messageId = messages.data.messages[0].id;
    const message = await gmail.users.messages.get({
      userId: "me",
      id: messageId,
    });

    const attachmentPart = message.data.payload.parts?.find((part) => part.body.attachmentId);
    if (!attachmentPart) {
      return res.status(404).json({ message: "No attachment found" });
    }

    const attachmentId = attachmentPart.body.attachmentId;
    const attachment = await gmail.users.messages.attachments.get({
      userId: "me",
      messageId: messageId,
      id: attachmentId,
    });

    const fileData = attachment.data.data;
    const buffer = Buffer.from(fileData, "base64");

    fs.writeFileSync(`./downloads/${attachmentPart.filename}`, buffer);
    res.json({ message: "Attachment saved!", filename: attachmentPart.filename });
  } catch (error) {
    console.error("Error fetching attachment:", error);
    res.status(500).json({ message: "Error fetching attachment", error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
