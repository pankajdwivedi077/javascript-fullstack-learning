const express = require('express');
const http = require('http');
const socketIo = require('socket.io')

const app = express();

//"Create a raw HTTP server, but use Express to handle all the normal HTTP routing" — and then Socket.io can also attach itself to the same server for WebSocket traffic.
//  Both Express and Socket.io share the same port (3000) because they share the same underlying server. Without this, you'd need two separate ports — one for HTTP and one for WebSocket, which is messy.
const server = http.createServer(app);

// initiate socket.io and attach this to the http server
const io = socketIo(server);

app.use(express.static("public")); // server the public folder

const users = new Set();

io.on("connection", (socket) => {
    console.log(`A user is connected`);

    // handle users when they will join
    socket.on("join", (username) => {
        users.add(username);
        socket.userName = username;
        // broadcast to all client that a new user is joined
        io.emit("userJoined",username);

        // send the updated userlist to all client
        io.emit("userList", Array.from(users));
    })
    // handle incoming chat message
     socket.on("chatMessage", (message) => {
        // broadcast the recieved message to all connected client
        io.emit("chatMessage", message);
     })
    // handle user disconnection
    socket.on("disconnect", ()=> {
        console.log('An user is disconned');
        users.forEach(user => {
            if(user === socket.userName){
                users.delete(user);
                io.emit("userLeft", socket.userName);
                io.emit("userList", Array.from(users));
            }
        })
    })
})

const port = 3000;

server.listen(port, ()=> {
    console.log(`server is running on ${port}`)
})