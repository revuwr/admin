import { z } from 'zod';
import { QuestionsTypeOptions } from '$lib/pocketbase-types';

export const questionSchema = z.object({
	id: z.string(),
	type: z.nativeEnum(QuestionsTypeOptions),
	title: z.string().min(1),
	description: z.string().optional(),
	required: z.boolean(),
	min: z.number().int().nonnegative().optional(),
	max: z.number().int().nonnegative().min(1).optional(),
	constrain: z.boolean(),
	rules: z.any().optional(),
	conditional: z.boolean().optional(),
	conditionquestion: z.string().optional(),
	conditionvalue: z.string().optional()
});

export type QuestionSchema = typeof questionSchema;
