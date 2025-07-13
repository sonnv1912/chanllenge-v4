import { endpoint } from '@packages/configs';
import cors from 'cors';
import express from 'express';
import { createServer } from 'node:http';
import { login, verifyOtp, logout } from 'src/services/auth-service';
import { getUserList, updateUser } from 'src/services/user-service';
import { authenticateToken } from './auth';
import { createChat, getChatList } from 'src/services/chat-service';
import { getMessageList } from 'src/services/message-service';
import { getTaskList, updateTask } from 'src/services/task-service';

const app = express();
const server = createServer(app);

app.use(express.json());

app.use(
   cors({
      origin: '*',
   }),
);

app.post(endpoint.login, login);
app.post(endpoint.verifyOtp, verifyOtp);
app.post(endpoint.logout, logout);

app.get(endpoint.users, authenticateToken, getUserList);
app.post(endpoint.users, authenticateToken, updateUser);

app.get(endpoint.chats, authenticateToken, getChatList);
app.post(endpoint.chats, authenticateToken, createChat);

app.get(endpoint.messages, authenticateToken, getMessageList);

app.get(endpoint.tasks, authenticateToken, getTaskList);
app.post(endpoint.tasks, authenticateToken, updateTask);

export { app, server };
