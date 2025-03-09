import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
import { sequence } from '@sveltejs/kit/hooks';
import { POCKETBASE_URL } from '$env/static/private';
import Pocketbase from 'pocketbase';

const handleParaglide: Handle = i18n.handle();

const handlePocketbase: Handle = async ({ event, resolve }) => {
	event.locals.pb = new Pocketbase(POCKETBASE_URL);
	const cookie = event.request.headers.get('cookie');
	event.locals.pb.authStore.loadFromCookie(cookie || '');
	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('_superusers').authRefresh();
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
	}
	event.locals.admin = event.locals.pb.authStore.record;

	const response = await resolve(event);
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ httpOnly: false }));
	return response;
};

export const handle: Handle = sequence(handleParaglide, handlePocketbase);
