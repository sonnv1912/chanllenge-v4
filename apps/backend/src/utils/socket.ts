import { Server } from 'socket.io';
import { server } from './app';
import { socketEvent } from '@packages/configs';
import { addMessage, updateMessage } from 'src/services/message-service';

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
   socket.on(socketEvent.onMessage, async (message) => {
      if (message.id) {
         const result = await updateMessage(message);

         io.emit(socketEvent.onMessage, result);

         return;
      }

      const result = await addMessage(message);

      io.emit(socketEvent.onMessage, result);
   });
});
