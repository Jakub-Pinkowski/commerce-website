import { syncLocalCartWithDatabase } from '$lib/stores/cart';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const user = event.locals.user;

	if (user) {
		await syncLocalCartWithDatabase(user.id);
	}

	return {
		user
	};
};
