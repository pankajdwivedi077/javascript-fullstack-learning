const http = require("http");

const server = http.createServer((req, res) => {
   const url = req.url;
   if (url === "/"){
    res.writeHead(200, {'content-type' : 'text/plain'} )
    res.end("inside home page")
   }else if(url === '/project'){
    res.writeHead(200, {'content-type': 'text/plain'} )
    res.end("inside project section")
   }else{
    res.writeHead(400, {'content-type': 'text/plain'} )
    res.end("page not found")
   }
})

const port = 3000;

server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
