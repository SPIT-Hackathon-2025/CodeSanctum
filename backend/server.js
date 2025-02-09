const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const workflowRoutes = require('./routes/workflowRoutes');
// const { authenticate } = require('./middlewares/auth');
const inventoryRoutes = require('./routes/inventoryRoutes');

// Allow requests from specific origin (frontend domain)
// const allowedOrigins = ['https://shree-vidya-saraswati-pujan.netlify.app'];
app.use(cors({
  origin: '*', // Allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies/auth headers if needed
}));

// Handle preflight requests for all paths
app.options('*', cors());

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to the Mastermind Server.');
});

app.use('/api/inventory', inventoryRoutes);
app.use('/api/workflows', workflowRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


