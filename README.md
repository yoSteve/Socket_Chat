# Sockets Chat App
This is a basic chat app built with Node and Socket.io. It uses route params to set the username and chat room values. 

System Messages welcome you to the app and alert other users when someone has joined or left the room. 

You can also send a special message get a list of current users.

## Usage 

On the landing page enter your Display Name and the name of the Chat Room you wish to join. You will be able to chat with any user who joins the same room.

To see a list of current users submit an '@CurrentUsers' message.

*Please note: this implementation does not in support persistent message data. In otherwords, if you refresh your browser you will loose your message history.* 

## Development setup

1. Clone or unzip the repository to a local directory.
2. Install dependencies with `npm install`
3. Run the server with `npm start`
4. Open your web browser to `http://localhost:3000`
5. Open another browser tab to `http://localhost:3000` and watch them talk to each other!

## Built With
* [Express](https://expressjs.com/)
* [Socket.io](https://socket.io/)
* [Moment.js](https://momentjs.com/)

*****************************************
[https://github.com/yoSteve/socket-basic](https://github.com/yoSteve/socket-basic)
