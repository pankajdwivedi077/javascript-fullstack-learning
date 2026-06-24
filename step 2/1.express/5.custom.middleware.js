const express = require('express')

const app = express();

const requestTimestampsLogger = (req, res, next) => {
    const timestamps = new Date().toISOString()
    console.log(`${timestamps} from ${req.method} to ${req.url}`)
    next()
}

app.use(requestTimestampsLogger)

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