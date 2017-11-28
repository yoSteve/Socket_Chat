const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// serve client-side files from ./public
app.use(express.static(__dirname + '/public'));

const clientInfo = {
    /* socket.id: { name: string, room: string } */
}; 

// socket.io listening for connection event
io.on('connection', (socket) => {
    console.log('User connected via socket.io!');
    socket.emit('message', {
        name: 'Sytem Message',
        text: 'Welcome to SocketChat',
        timestamp: new Date()
    });

    // 'joinRoom' is an event emitted by the client on connection
    socket.on('joinRoom', (req) => {
        clientInfo[socket.id] = req; // socket.id is auto-generated by socket.io
        socket.join(req.room);
        console.log(`User ${clientInfo[socket.id].name} has joined ${clientInfo[socket.id].room} room`);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System Message',
            text: req.name + ' has joined!',
            timestamp: new Date()
        }) // socket.broadcast.to(room) will broadcast to all other sockets in this room (excluding sender).
    });
    
    socket.on('message', (message) => {
        console.log(clientInfo[socket.id].room + ' Message received: ' + message.text);
        message.timestamp = new Date();
        io.to(clientInfo[socket.id].room).emit('message', message); // io.to(room) will broadcast to all sockets connected to this room (including sender).
    });

    socket.on('disconnect', () =>{
        const userData = clientInfo[socket.id];
        if (typeof userData !== 'undefined') {
            socket.leave(userData.room);
            io.to(userData.room).emit('message', {
                name: 'System Message',
                text: userData.name + ' has left.',
                timestamp: new Date()
            });
            delete clientInfo[socket.id];
        }
    });

});

http.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}.`);
});