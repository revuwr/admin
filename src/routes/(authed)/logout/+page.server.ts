import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals }) => {
		locals.pb.authStore.clear();
		locals.admin = null;
		redirect(303, '/');
	}
};
