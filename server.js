const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// serve client-side files from ./public
app.use(express.static(__dirname + '/public'));

// socket.io listening for connection event
io.on('connection', () => {
    console.log('User connected via socket.io!');
});

http.listen(PORT, () => {
    console.log('Server listening on PORT ' + PORT);
});