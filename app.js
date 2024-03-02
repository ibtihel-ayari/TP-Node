const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3000;

// Define a route
app.get('/', (req, res) => {});

// Connection to MongoDB and start server
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
