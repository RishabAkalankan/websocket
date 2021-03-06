const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');
    socket.emit('newMessage', {
        from: 'king@landing.atod',
        text: 'Welcome'
    });
    socket.broadcast.emit('newMessage', {
        from: 'king@landing.atod',
        text: 'new user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
    socket.on('disconnect', () => {
        console.log('user was disconnected');
    })
});


server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})