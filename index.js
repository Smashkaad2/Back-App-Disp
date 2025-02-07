import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();


const allowedOrigins = [
  'http://localhost:5173',
  'https://front-app-disp.vercel.app/'
];

app.use(cors({ origin: allowedOrigins, methods: ['GET', 'POST'] }));

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

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
