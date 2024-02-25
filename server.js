require('dotenv').config();
const db = require('./config/db')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Basic route for the root
app.get('/', (req, res) => {
    res.send('Online Market Application API');
});

// Routes
app.use('/api/products', require('./routes/product.routes'));

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
