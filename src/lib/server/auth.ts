import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { createPool } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

import { dev } from '$app/environment';
import { POSTGRES_URL } from '$env/static/private';

import { usersTable, sessionsTable } from '$lib/drizzle/schema';

const pool = createPool({ connectionString: POSTGRES_URL });
const db = drizzle(pool);

const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// TODO: set to `true` when using HTTPS
			secure: !dev
		}
	},
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            email: attributes.email
        };
    }
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
    email: string;
}