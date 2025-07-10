import { endpoint } from '@packages/configs';
import { login, logout, verifyOtp } from './services/auth-service';
import { app } from './utils/app';
import { mail } from './utils/mail';
import { authenticateToken } from './utils/auth';
import { getUserList, updateUser } from './services/user-service';

mail.init();

app.post(endpoint.login, login);
app.post(endpoint.verifyOtp, verifyOtp);
app.post(endpoint.logout, logout);

app.get(endpoint.users, authenticateToken, getUserList);
app.post(endpoint.users, authenticateToken, updateUser);

app.listen(4000);
