const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const express = require('express');
const connectToDB = require('./database/db');
const bookRoutes = require('./routes/book-routes')

const app = express();

const PORT = process.env.PORT;

// connect to database
connectToDB();

// middleware -> express.json()
app.use(express.json());

// routes
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})