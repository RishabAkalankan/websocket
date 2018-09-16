var socket = io();
socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: 'samwellTarley@atod.com',
    //     message: 'Hello!'
    // });
    socket.emit('createMessage', {
        from: 'Petyr Baelish',
        message: 'I see that picture of me sitting in the iron throne, with you besides me'
    })
});
socket.on('disconnect', function () {
    console.log('disconnected from server');
});
// socket.on('newEmail', function(email) {
//     console.log('new emailreceived');
//     console.log(email);
// });

socket.on('newMessage', function(message) {
    console.log(message);
})