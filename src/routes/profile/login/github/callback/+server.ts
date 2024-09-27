import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize } from 'lucia';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { createPool } from '@vercel/postgres';
import { eq } from 'drizzle-orm';

import { github, lucia } from '$lib/server/auth';
import { usersTable } from '$lib/drizzle/schema';
import { POSTGRES_URL } from '$env/static/private';

import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const pool = createPool({ connectionString: POSTGRES_URL });
	const db = drizzle(pool);

	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

        const existingUserQuery = await db.select().from(usersTable).where(eq(usersTable.github_id, githubUser.id));
        const existingUser = existingUserQuery[0];

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			const userId = generateIdFromEntropySize(10); // 16 characters long

            await db.insert(usersTable).values({
				id: userId,
				github_id: githubUser.id,
				github_username: githubUser.login
			});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
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
}

interface GitHubUser {
	id: number;
	login: string;
}
