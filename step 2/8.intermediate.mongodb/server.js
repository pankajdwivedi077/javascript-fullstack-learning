const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const express = require('express');

const app = express();
const connectToDB = require('./data/db');
const productRoutes = require('./routes/product-routes');
const BookRoutes = require('./routes/book-routes');

const PORT = process.env.PORT;

// connect to our database
connectToDB();

// use middleware
app.use(express.json());

app.use('/products', productRoutes);
app.use('/books', BookRoutes);

app.listen(PORT, ()=> {
    console.log(`server is runnning on ${PORT}`)
})