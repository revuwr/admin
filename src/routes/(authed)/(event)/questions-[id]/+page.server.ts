import type { PageServerLoad, Actions } from './$types.js';
import { error, fail } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { questionSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ parent, locals }) => {
	const { event } = await parent();

	if (!event) {
		throw error(404, 'Event not found');
	}

	if (!event.expand) {
		throw error(404, 'Questions not found');
	}

	if (!event.expand.questions) {
		event.expand.questions = [];
	}

	const questions = event.expand.questions.map((q) => ({
		id: q.id,
		type: q.type,
		title: q.title,
		description: q.description,
		required: q.required,
		min: q.min,
		max: q.max,
		constrain: q.constrain,
		rules: q.rules,
		conditional: q.conditional,
		conditionquestion: q.conditionquestion,
		conditionvalue: q.conditionvalue
	}));

	try {
		const validatedQuestions = [];
		for (const question of questions) {
			const form = await superValidate(question, zod(questionSchema));
			if (!form.valid) {
				throw error(400, 'Invalid question data');
			}
			validatedQuestions.push(form);
		}
		return { forms: validatedQuestions };
	} catch (err) {
		throw error(404, 'Error loading event');
	}
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const form = await superValidate(request, zod(questionSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			// impl
			return message(form, '');
		} catch (err) {
			return setError(form, '', 'Updating questions failed');
		}
	}
};
