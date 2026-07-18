const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Redis = require("ioredis");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const logger = require("./utils/logger");
const proxy = require("express-http-proxy");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT;

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

// rate limiting

const rateLimiter = rateLimit({
    windowMs: 15*60*1000,
    limit: 100,
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

app.use(rateLimiter);

const proxyOptions = {
    proxyReqPathResolver: (req)=> {
        return req.originalUrl.replace(/^\/v1/, "/api")
    },
    proxyErrorHandler: (err, res, next)=> {
        logger.error(`Proxy error: ${err.message}`);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })

    }
}

// setting up proxy for identityService
app.use("/v1/auth", proxy(process.env.IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq)=> {
        proxyReqOpts.headers['Content-Type']="application/json"
        return proxyReqOpts
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes)=> {
        logger.info(`Response recieved from Identity service: ${proxyRes.statusCode} `)
        return proxyResData
    }
}));

app.use(errorHandler);

app.listen(PORT, ()=> {
    logger.info(`Api gateway is ruuning on port:  ${PORT}`);
    logger.info(`IdentityService is ruuning on port: ${process.env.IDENTITY_SERVICE_URL}`);
    logger.info(`Redis url ${process.env.REDIS_UR}`)
    console.log(`Api gateway is ruuning on port:  ${PORT}`);
    console.log(`IdentityService is ruuning on port: ${process.env.IDENTITY_SERVICE_URL}`);

})