const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const express = require('express');
const connectToDB = require('./data/db')
const authRoutes = require('./routes/auth-routes')
const homeRoutes = require('./routes/home-routes')
const adminRoutes = require('./routes/admin-routes')
const imageRoutes = require('./routes/image-route')

const app = express();

const PORT = process.env.PORT || 3000;

// connect to database
connectToDB();

// midleware
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/image', imageRoutes);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})