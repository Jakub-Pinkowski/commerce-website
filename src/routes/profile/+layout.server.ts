import { redirect } from '@sveltejs/kit';
import { destroyUserSession } from '$lib/helpers/auth';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (event) => {
    if (!event.locals.user) redirect(302, '/profile/login');

    return {
        user: event.locals.user
    };
};