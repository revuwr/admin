import type { PageServerLoad, Actions } from './$types.js';
import { error, fail } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ parent }) => {
	const { event } = await parent();

	if (!event) {
		throw error(404, 'Event not found');
	}

	const formData = {
		title: event.title,
		description: event.description,
		targetAudience: event.targetAudience,
		startDate: event.startDate,
		endDate: event.endDate,
		externalUrl: event.externalUrl,
		earlyAccess: event.earlyAccess,
		lateAccess: event.lateAccess,
		responseLimit: event.responseLimit,
		userResponseLimit: event.userResponseLimit,
		serialPrefix: event.serialPrefix
	};

	try {
		const form = await superValidate(formData, zod(formSchema));
		return { form };
	} catch (err) {
		throw error(404, 'Error loading event');
	}
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const form = await superValidate(request, zod(formSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const event = await locals.pb.collection('events').update(params.id, form.data);
			return message(form, '');
		} catch (err) {
			return setError(form, '', 'Updating event settings failed');
		}
	}
};
