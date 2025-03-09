import type { PageServerLoad, Actions } from './$types.js';
import { fail, isRedirect, redirect } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await event.locals.pb
				.collection('_superusers')
				.authWithPassword(form.data.email, form.data.password);
			redirect(303, `${PUBLIC_BASE_URL}/`);
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			return setError(form, '', 'Authentication failed');
		}

		return fail(500, { form });
	}
};
