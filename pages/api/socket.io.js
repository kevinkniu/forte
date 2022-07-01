const express = require('express');

const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    method: ['GET', 'POST'],
  },
});
io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    socket.join(data);
  });
  socket.on('send_message', (data) => {
    axios.post('http://127.0.0.1:3000/api/messages/addMessage', { data }, {
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(() => console.log('Posted'))
      .catch((err) => console.log(err));
    io.in(data.room).emit('receive_message', data);
  });
});
server.listen(3001, () => {
  console.log('SERVER IS RUNNING');
});
