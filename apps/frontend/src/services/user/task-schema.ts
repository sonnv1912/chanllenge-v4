import z from 'zod';

export const taskSchema = z.object({
   id: z.string().optional().nullable(),
   due_date: z.string().min(1),
   created_at: z.string(),
   completed_at: z.string().optional().nullable(),
   title: z.string().min(1),
   description: z.string().optional().nullable(),

   users: z
      .array(
         z.object({
            id: z.string().optional().nullable(),
            name: z.string(),
            email: z.string(),
            address: z.string(),
            role: z.string(),
            phone_number: z.string(),
            status: z.string(),
         }),
      )
      .min(1),
});
