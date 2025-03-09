import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { PUBLIC_BASE_URL } from '$env/static/public';
import type { EventsResponse } from '$lib/pocketbase-types';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	let event: EventsResponse | null = null;

	if (!params.id) {
		error(404, 'Event not found');
	}

	try {
		event = await locals.pb.collection('events').getOne(params.id);
	} catch (err) {
		error(500, 'Failed to fetch event');
	}

	return {
		event: event
	};
};
