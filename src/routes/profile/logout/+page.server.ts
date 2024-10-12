import { redirect } from '@sveltejs/kit';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/session';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user || !event.locals.session) {
		throw redirect(302, '/login');
	}

	invalidateSession(event.locals.session.id);
	deleteSessionTokenCookie(event);

	return {
		user: event.locals.user
	};
};
