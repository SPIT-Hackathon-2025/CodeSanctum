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
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
const CLIENT_ID="415758528604-es4v53bag2qoke0aaclklf1jrfaosg1l.apps.googleusercontent.com"
const CLIENT_SECRET="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"
const REDIRECT_URI="http://localhost:5000/auth/callback"

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);


// Step 1: Get Google OAuth URL
app.get("/auth/google", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });
  res.json({ url: authUrl });
});

// Step 2: Exchange code for access token
app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

// Step 3: Fetch unread emails
app.get("/emails", async (req, res) => {
  try {
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const response = await gmail.users.messages.list({
      userId: "me",
      q: "is:unread",
    });
    res.json(response.data.messages || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch emails" });
  }
});

// Step 4: Fetch email attachments
app.get("/emails/:id/attachments", async (req, res) => {
  try {
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const { id } = req.params;
    const email = await gmail.users.messages.get({ userId: "me", id });
    const parts = email.data.payload.parts || [];

    const attachments = parts.filter(
      (part) => part.filename && part.body.attachmentId
    );
    res.json(attachments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attachments" });
  }
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
