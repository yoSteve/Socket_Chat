const name = getQueryVariable('name') || 'anonymous';
const room = getQueryVariable('room') || 'Waiting Room';
const socket = io();

// set content on H1 on chat.html
$('.room-title').html(room);

socket.on('connect', () => {
    console.log('Connected to socket server! - Room: ' + room);
    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', (message) => {
    momentTimestamp = moment(message.timestamp).format('LT');
    console.log('New message:', message.text);
    $('.messages').append(`
        <div class="message">
            <p><strong>${message.name} - [${momentTimestamp}]</strong></p>
            <p><span>&emsp;</span>${message.text}</p>
        </div>
    `);
});

// Handle new message form submission
const $form = $('#message-form');

$form.on('submit', (event) => {
    event.preventDefault();
    $message = $form.find('input[name=message]');    
    socket.emit('message', {
        name: name,
        text: $message.val(),
    });
    $message.val('');
});