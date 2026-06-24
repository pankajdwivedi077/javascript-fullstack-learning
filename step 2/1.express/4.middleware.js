const express = require('express')

const app = express();

// middleware functions

const myFirstMiddleware = (req, res, next) => {
    console.log("first middleware will run on every request");
    next();
};

app.use(myFirstMiddleware);

app.get('/', (req, res) => {
    res.send("home page")
})

app.get('/about', (req, res) => {
    res.send("about page")
})

const port = 3000
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})