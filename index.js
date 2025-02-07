import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;


const allowedOrigins = [
  'http://localhost:5173',
  'https://front-app-disp.vercel.app/' 
];

app.use(cors({ origin: allowedOrigins, methods: ['GET', 'POST'] }));


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});


io.on('connection', (socket) => {
  console.log(' Cliente conectado');

  socket.on('sendLocation', (locationData) => {
    console.log(' Datos recibidos del cliente:', locationData);
    socket.emit('locationUpdate', locationData);
  });

  socket.on('disconnect', () => {
    console.log(' Cliente desconectado');
  });
});

server.listen(port, () => {
  console.log(` Servidor WebSockets corriendo en el puerto ${port}`);
});
