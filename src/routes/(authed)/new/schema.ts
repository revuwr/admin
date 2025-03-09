import { z } from 'zod';
import { EventsTargetAudienceOptions } from '$lib/pocketbase-types';

export const formSchema = z.object({
	title: z.string().min(1),
	description: z.string(),
	targetAudience: z
		.array(z.nativeEnum(EventsTargetAudienceOptions))
		.min(1)
		.default(Object.values(EventsTargetAudienceOptions)),
	startDate: z.string().refine((val) => val, { message: 'Start date is required' }),
	endDate: z.string().refine((val) => val, { message: 'End date is required' }),
	externalUrl: z.string().url().optional(),
	earlyAccess: z.boolean(),
	lateAccess: z.boolean(),
	responseLimit: z.number().int().nonnegative().default(1000),
	userResponseLimit: z.number().int().nonnegative().default(1),
	serialPrefix: z.string().min(1).default('')
});

export type FormSchema = typeof formSchema;
