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
        from: 'daenerys@atod.com',
        message: 'Im coming you pussy',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log(message);
    })
    socket.on('disconnect', () => {
        console.log('user was disconnected');
    })
});


server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})