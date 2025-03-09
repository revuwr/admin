import { z } from 'zod';

export const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, 'Password is required')
});

export type FormSchema = typeof formSchema;
