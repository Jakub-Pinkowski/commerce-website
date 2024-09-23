import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

import type { Actions, PageServerLoad } from './$types';

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.session) {
			console.log('event.locals.session is undefined');
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		console.log('User logged out, redirecting to /profile/login');

		redirect(302, '/profile/login');
	}
};
