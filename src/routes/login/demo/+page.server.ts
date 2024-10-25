import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import { db } from '$lib/helpers/drizzle';
import { usersTable } from '$lib/drizzle/schema';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const demoUserQuery = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, 'demo@demo.com'))
		.limit(1);
	const demoUser = demoUserQuery[0];
	console.log('demoUser', demoUser);

	if (!demoUser) {
		return redirect(302, '/');
	}

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, demoUser.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	redirect(302, '/profile');
};
