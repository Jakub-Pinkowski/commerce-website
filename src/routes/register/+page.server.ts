import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';

import { db } from '$lib/helpers/drizzle';
import { usersTable } from '$lib/drizzle/schema';
import { validateEmailAndPassword, hashPassword } from '$lib/helpers/auth';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';

import type { Actions } from './$types';

// TODO: If already logged in, redirect to profile

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (typeof email !== 'string' || typeof password !== 'string') {
			return fail(400, {
				message: 'Invalid form data'
			});
		}

		const validation = validateEmailAndPassword(email, password);
		if (!validation.valid) {
			return fail(400, {
				message: validation.message
			});
		}

		const existingUserQuery = await db.select().from(usersTable).where(eq(usersTable.email, email));
		const existingUser = existingUserQuery[0];

		if (existingUser) {
			if (existingUser.google_id !== null) {
				// TODO: Inform user that their account has been merged with Google
				const passwordHash = await hashPassword(password);

				await db
					.update(usersTable)
					.set({ password_hash: passwordHash })
					.where(eq(usersTable.id, existingUser.id));

				const sessionToken = generateSessionToken();
				const session = await createSession(sessionToken, existingUser.id);
				setSessionTokenCookie(event, sessionToken, session.expiresAt);

				redirect(302, '/profile');
			} else {
				return fail(400, {
					message: 'User already exists'
				});
			}
		}

		const userId = generateIdFromEntropySize(10);
		const passwordHash = await hashPassword(password);

		await db.insert(usersTable).values({
			id: userId,
			email: email,
			password_hash: passwordHash,
			created_at: new Date()
		});

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, userId);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		redirect(302, '/profile');
	}
};
