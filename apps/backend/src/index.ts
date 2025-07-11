import { server } from './utils/app';
import { mail } from './utils/mail';

mail.init();

server.listen(4000);
