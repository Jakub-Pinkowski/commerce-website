import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (event) => {
    console.log("event.locals.user: from +layout.server.ts ", event.locals.user);
    if (!event.locals.user) redirect(302, '/login');

    return {
        user: event.locals.user
    };
};