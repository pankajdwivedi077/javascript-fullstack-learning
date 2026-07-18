const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require("dotenv").config();

const express = require("express");
const logger = require("./utils/logger");
const connected = require("./data/db")
const helmet = require("helmet");
const cors = require("cors");
const identityRouter = require("./routes/identity.route");
const { RateLimiterRedis } = require("rate-limiter-flexible")
const Redis = require("ioredis");
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const errorHandler = require('./middleware/errorHandler');

const app = express();

const PORT = process.env.PORT;

// connect to db
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

//DDos protection and rate limiting
const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "middleware", // added to redis keys for rate limiting and this will hepls in distinguish b/w rate limiting data to noraml data
    points: 10,
    duration: 1
})

app.use((req, res, next) => {
    rateLimiter.consume(req.ip).then(() => next()).catch(()=> {
        logger.warn(`Rate limit exceede for IP: ${req.ip}`);
        res.status(429).json({
            success: false,
            message: "Too many request"
        })
    })
})

// IP based rate limiting for sensitive endpoints
const sensitiveEndPointsLimiter = rateLimit({
    windowMs: 15*60*1000,
    limit: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req,res)=> {
        logger.warn(`Sensitive endpoint rate limit exceeded for ip: ${req.ip}`);
          res.status(429).json({
            success: false,
            message: "Too many request"
        })
    },
    store: new RedisStore({
      sendCommand: (...args) => redisClient.call(args[0], ...args.slice(1)),
    })
})

// apply this sensitiveEndpointLimiter to our rotes
app.use("/api/auth/register", sensitiveEndPointsLimiter);

app.use("/api/auth", identityRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Identity server is running on ${PORT}`);
    console.log(`Identity server is running on ${PORT}`);
})

// unhandled promise rejection

process.on("unhandledRejection", (reason, promise)=> {
    logger.error('Unhandled rejection at ', promise, " reason", reason);
}) 