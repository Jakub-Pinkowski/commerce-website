import { redirect } from '@sveltejs/kit';

import { user as userStore } from '$lib/stores/user';

import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	userStore.set(null);
	redirect(302, '/');
};
