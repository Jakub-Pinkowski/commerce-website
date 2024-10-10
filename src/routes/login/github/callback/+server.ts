import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize } from 'lucia';
import { eq } from 'drizzle-orm';

import { db } from '$lib/helpers/drizzle';
import { github } from '$lib/server/auth';
import { usersTable } from '$lib/drizzle/schema';
import { createUserSession } from '$lib/helpers/auth';

import type { RequestEvent } from '@sveltejs/kit';

interface GitHubUser {
	id: number;
	login: string;
}

export async function GET(event: RequestEvent): Promise<Response> {
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

		const existingUserQuery = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.github_id, githubUser.id));
		const existingUser = existingUserQuery[0];

		if (existingUser) {
			await createUserSession(existingUser.id, event);
		} else {
			const userId = generateIdFromEntropySize(10);

			await db.insert(usersTable).values({
				id: userId,
				github_id: githubUser.id,
				github_username: githubUser.login,
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
}
