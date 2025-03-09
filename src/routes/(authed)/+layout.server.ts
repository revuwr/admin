import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { PUBLIC_BASE_URL } from '$env/static/public';
import type { EventsResponse } from '$lib/pocketbase-types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.admin) {
		redirect(303, `${PUBLIC_BASE_URL}/auth`);
	}

	let events: EventsResponse[] | null = null;

	try {
		events = await locals.pb.collection('events').getFullList();
	} catch (err) {
		error(500, 'Failed to fetch events');
	}

	return {
		events: events
	};
};
