

const requestLogger = (req, res, next) => {

  const timeStrap = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const userAgent = req.get("User-Agent");
  console.log(`[${timeStrap}] ${method} ${url} ${userAgent}`)

  next()

};

const addTimeStamp = (req, res, next) => {
    req.timeStrap = new Date().toISOString();
    next()
} 

module.exports = { requestLogger, addTimeStamp };