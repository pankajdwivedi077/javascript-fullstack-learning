const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require("dotenv").config();

const express = require("express");
const { configureCors } = require("./config/corsConfig");
const { requestLogger, addTimeStamp } = require("./middleware/customMiddleware");
const {globalErrorHandler  } = require("./middleware/errorHandler");
const { urlVerisoning, headerVerison,contentTypeVersioning } = require("./middleware/apiVersioning");
const { createBasicRateLimiter } = require("./middleware/rateLimiting");
const itemsRoutes = require("./route/items");

const app = express();

const PORT = process.env.PORT || 3000;

// middleware

app.use(express.json());

app.use(configureCors());  

app.use(requestLogger);
app.use(addTimeStamp);
app.use(globalErrorHandler);

app.use(createBasicRateLimiter(100, 15 * 60 * 1000));

app.use(urlVerisoning("v1"));

app.use("/api/v1", itemsRoutes);

app.listen(PORT, ()=> {
    console.log(`server running on ${PORT}`)
})