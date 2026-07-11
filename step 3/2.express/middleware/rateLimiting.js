const rateLimit = require("express-rate-limit");

const createBasicRateLimiter = (maxRequest, time) => {
    return rateLimit({
        limit: maxRequest,
        windowMs: time,
        message: "Too many requests please try again",
        standardHeaders: true, 
	    legacyHeaders: false
    })
}

module.exports = { createBasicRateLimiter };