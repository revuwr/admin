import type { PageServerLoad, Actions } from './$types.js';
import { error, fail } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ params, parent }) => {
	const id = params.id;
	const { event: eventRecord } = await parent();

	if (!eventRecord) {
		throw error(404, 'Event not found');
	}

	try {
		const formData = {
			title: eventRecord.title,
			description: eventRecord.description,
			targetAudience: eventRecord.targetAudience,
			startDate: eventRecord.startDate,
			endDate: eventRecord.endDate,
			externalUrl: eventRecord.externalUrl,
			earlyAccess: eventRecord.earlyAccess,
			lateAccess: eventRecord.lateAccess,
			responseLimit: eventRecord.responseLimit,
			userResponseLimit: eventRecord.userResponseLimit,
			serialPrefix: eventRecord.serialPrefix
		};

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
			await locals.pb.collection('events').update(params.id, form.data);
			return message(form, '');
		} catch (err) {
			return setError(form, '', 'Updating event settings failed');
		}
	}
};
