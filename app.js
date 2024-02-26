const express = require('express');
const app = express();
//const PORT = 3000;
const mongoose = require('mongoose');
const dotenv = require ('dotenv');



dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT||3000

// define a route
app.get('/', (req, res) => {});

// connection to mongodb and start server
mongoose.connect(MONGODB_URI).then(() => {
    console.log('connected to mongoDb');
    app.listen(PORT, () => {
        console.log(`server listening on ${PORT}`);
    });
}).catch((err) => {
    console.error('Error connecting to mongodb:', err.message);
});
