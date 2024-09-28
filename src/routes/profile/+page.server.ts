import { redirect } from '@sveltejs/kit';
import { destroyUserSession } from '$lib/helpers/auth';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/profile/login');
};

export const actions: Actions = {
	default: async (event) => {
		await destroyUserSession(event);

		redirect(302, '/profile/login');
	}
};
