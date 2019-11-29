const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.html');
});

server = app.listen(3000);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('New user connected !');

  socket.username = "Anonymous";

  socket.on('change_username', (data) => {
    socket.username = data.username;
    console.log(data.username);
  });

  socket.on('new_message', (data) => {
    console.log(data.message);
    io.sockets.emit('new_message', {message: data.message, username: socket.username});
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {username: socket.username});
  })


});