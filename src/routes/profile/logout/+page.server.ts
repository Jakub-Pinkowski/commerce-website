import { fail, redirect } from '@sveltejs/kit';
import { destroyUserSession } from '$lib/helpers/auth';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/session';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user || !event.locals.session) {
		throw redirect(302, '/login');
	}

	invalidateSession(event.locals.session.id);
	deleteSessionTokenCookie(event);

	console.log('destroyed session');
	return {
		user: event.locals.user
	};
};
