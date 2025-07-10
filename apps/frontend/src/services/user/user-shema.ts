import z from 'zod';

export const userSchema = z.object({
   name: z.string().min(1, 'Required'),
   phone_number: z.string().min(1, 'Required'),
   email: z.string().min(1, 'Required'),
   address: z.string().min(1, 'Required'),
   role: z.string().min(1, 'Required'),
});
