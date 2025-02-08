const express = require('express');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');
const app = express();
const { authenticate } = require('./middlewares/auth');

// Allow requests from specific origin (frontend domain)
// const allowedOrigins = ['https://shree-vidya-saraswati-pujan.netlify.app'];
const allowedOrigins = ['https://localhost'];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      // console.log("errorrrr...")
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to the Mastermind Server.');
});


app.use('/api/products', authenticate, productRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Following code for running the server on specific network i.e. IP
// app.listen(PORT, '10.112.9.12', () => {
//     console.log(`Server running on port ${PORT}`);
//   });
