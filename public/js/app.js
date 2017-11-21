const socket = io();

socket.on('connect', () => {
    console.log('Connected to socket server!');
});

socket.on('message', (message) => {
    console.log('New message:', message.text);
});

// Handle new message form submission
const $form = $('#message-form');

$form.on('submit', (event) => {
    event.preventDefault();
    $message = $form.find('input[name=message]');    
    socket.emit('message', {
        text: $message.val()
    });
    $message.val('');
});