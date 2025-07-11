import { Server } from 'socket.io';
import { server } from './app';

const io = new Server(server, {
   transports: ['websocket', 'polling'],
   cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
   },
   allowEIO3: true,
});

io.on('connection', (socket) => {
   socket.on('chat message', (message) => {
      io.emit('chat message', message);
   });
});
