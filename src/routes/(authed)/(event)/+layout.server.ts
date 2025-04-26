import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { PUBLIC_BASE_URL } from '$env/static/public';
import {
	Collections,
	type EventsResponse,
	type QuestionsResponse,
	type TermsResponse
} from '$lib/pocketbase-types';

type ExpandedEventsResponse = EventsResponse<{
	questions: QuestionsResponse[];
	terms: TermsResponse[];
}>;

export const load: LayoutServerLoad = async ({ locals, params }) => {
	let event: ExpandedEventsResponse | null = null;

	if (!params.id) {
		error(404, 'Event not found');
	}

	try {
		event = await locals.pb
			.collection(Collections.Events)
			.getOne<ExpandedEventsResponse>(params.id, {
				expand: 'questions,terms'
			});
	} catch (err) {
		error(500, 'Failed to fetch event');
	}

	return {
		event: event
	};
};
