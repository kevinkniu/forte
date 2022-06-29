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
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    console.log('ROOM', data);
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

    socket.to(data.room).emit('receive_message', data);
  });
});

server.listen(3001, () => {
  console.log('SERVER IS RUNNING');
});
