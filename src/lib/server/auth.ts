import { Lucia } from 'lucia';
import { GitHub, Google } from 'arctic';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { createPool } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

import { dev } from '$app/environment';
import {
	POSTGRES_URL,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI_DEV,
	GOOGLE_REDIRECT_URI_PROD
} from '$env/static/private';

import { usersTable, sessionsTable } from '$lib/drizzle/schema';

const pool = createPool({ connectionString: POSTGRES_URL });
const db = drizzle(pool);

const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			githubId: attributes.github_id,
			username: attributes.username
		};
	}
});

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

const googleRedirectURI = dev ? GOOGLE_REDIRECT_URI_DEV : GOOGLE_REDIRECT_URI_PROD;
export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, googleRedirectURI);

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email?: string;
	github_id?: number;
	username?: string;
}
