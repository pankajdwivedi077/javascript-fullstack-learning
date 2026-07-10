const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require("dotenv").config();

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

// middleware

app.use(express.json());

app.listen(PORT, ()=> {
    console.log(`server running on ${PORT}`)
})