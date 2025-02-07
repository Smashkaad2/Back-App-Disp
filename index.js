import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST'] }));

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('sendLocation', (locationData) => {
    console.log('Datos recibidos del cliente:', locationData);
    socket.emit('locationUpdate', locationData);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor WebSockets corriendo en http://localhost:${port}`);
});
