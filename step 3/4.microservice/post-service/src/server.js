const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require("dotenv").config();

const express = require("express");
const logger = require("./utils/logger");
const connected = require("./data/db");
const helmet = require("helmet");
const cors = require("cors");
const postRouter = require("./routes/post.routes");
const Redis = require("ioredis");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT;

connected();

const redisClient = new Redis(process.env.REDIS_URL);

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next)=> {

    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Received body ${req.body}`);

    next();
})

// ip based rate limit

//routes -> pass redisClient to routes
app.use("/api/posts", (req, res, next) => {
    req.redisClient = redisClient
    next()
}, postRouter)

app.use(errorHandler);

app.listen(PORT, ()=> {
    logger.info(`Post serice running on port ${PORT}`);
})

// unhandled promise rejection

process.on("unhandledRejection", (reason, promise)=> {
    logger.error('Unhandled rejection at ', promise, " reason", reason);
}) 