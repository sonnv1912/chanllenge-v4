import emailjs from '@emailjs/nodejs';

const init = () => {
   emailjs.init({
      publicKey: 'KS3yKzQfyqxqzO415',
      privateKey: '-IapaWvIEGMBy0EKgqLCD', // optional, highly recommended for security reasons
   });
};

const send = async (body: object) => {
   await emailjs.send('service_asbjq23', 'template_owy636h', body);
};

export const mail = {
   init,
   send,
};
