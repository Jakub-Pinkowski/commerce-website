import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize } from 'lucia';
import { eq } from 'drizzle-orm';

import { db } from '$lib/helpers/drizzle';
import { google } from '$lib/server/auth';
import { usersTable } from '$lib/drizzle/schema';
import { createUserSession } from '$lib/helpers/auth';

import type { RequestEvent } from '@sveltejs/kit';

interface GoogleUser {
	id: string;
	email: string;
	picture: string;
}

export const GET = async (event: RequestEvent): Promise<Response> => {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const storedCodeVerifier = event.cookies.get('google_oauth_code_verifier') ?? null;

	if (!code || !state || !storedState || state !== storedState || !storedCodeVerifier) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
		const googleUserResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const googleUser: GoogleUser = await googleUserResponse.json();

		const existingUserQuery = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, googleUser.email));
		const existingUser = existingUserQuery[0];

		if (existingUser) {
			if (existingUser.google_id) {
				// User already signed in with Google before
				await createUserSession(existingUser.id, event);
			} else {
				// TODO: Inform user that their account has been merged with Google
				// User registered with email before, now signing in with Google
				await db
					.update(usersTable)
					.set({
						google_id: googleUser.id,
						google_picture: googleUser.picture
					})
					.where(eq(usersTable.id, existingUser.id));

				await createUserSession(existingUser.id, event);
			}
		} else {
			// New user signing in with Google
			const userId = generateIdFromEntropySize(10);

			await db.insert(usersTable).values({
				id: userId,
				email: googleUser.email,
				google_id: googleUser.id,
				google_picture: googleUser.picture,
				created_at: new Date()
			});

			await createUserSession(userId, event);
		}

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/profile'
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
};
