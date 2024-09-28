import { redirect } from '@sveltejs/kit';
import { destroyUserSession } from '$lib/helpers/auth';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/login');

	await destroyUserSession(event);

	redirect(302, '/');
};
