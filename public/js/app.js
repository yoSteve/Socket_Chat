const socket = io();

socket.on('connect', () => {
    console.log('Connected to socket server!');
    socket.emit('message', {
        text: "OMG I'm emitting!"
    })
});

socket.on('message', (message) => {
    console.log('New message:', message.text);
});