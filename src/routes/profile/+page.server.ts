import { redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (event) => {
    console.log("event.locals: ", event.locals);
	if (!event.locals.user) redirect(302, '/profile/login');
};
