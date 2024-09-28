import { redirect } from '@sveltejs/kit';
import { destroyUserSession } from '$lib/helpers/auth';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		await destroyUserSession(event);

		redirect(302, '/login');
	}
};
