const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const express = require('express');
const connectToDB = require('./data/db')
const authRoutes = require('./routes/auth-routes')

const app = express();

const PORT = process.env.PORT || 3000;

// connect to database
connectToDB();

// midleware
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})