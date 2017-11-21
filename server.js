const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// serve client-side files from ./public
app.use(express.static(__dirname + '/public'));

// socket.io listening for connection event
io.on('connection', (socket) => {
    console.log('User connected via socket.io!');

    socket.emit('message',{
        text: 'Welcome to SocketChat'
    });

    socket.on('message', (message) => {
        console.log('Message received: ' + message.text);
        // io.emit() would broadcast to all socket instances including this one.
        socket.broadcast.emit('message', message); // socket.broadcast.emit() will broadcast to all other socket instances excluding this one.
    });
});

http.listen(PORT, () => {
    console.log('Server listening on PORT ' + PORT);
});