import z from 'zod';

export const userSchema = z.object({
   id: z.string().optional().nullable(),
   name: z.string().min(1, 'Required'),
   phone_number: z.string().min(1, 'Required'),
   email: z.string().min(1, 'Required'),
   address: z.string().min(1, 'Required'),
   role: z.string().min(1, 'Required'),
   status: z.string().default('inactive'),
});
