import { env } from '@packages/configs';
import { io } from 'socket.io-client';

export const socket = io(env.BASE_API_URL);
