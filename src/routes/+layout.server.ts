import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const user = event.locals.user;

	if (user) {
		return {
			user
		};
	}
};
