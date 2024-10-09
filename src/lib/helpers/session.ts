import { encodeBase32LowerCaseNoPadding, encodeBase32, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { eq } from 'drizzle-orm';
import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/vercel-postgres';

import { usersTable, sessionsTable } from '$lib/drizzle/schema';

import type { DrizzleUser, DrizzleSession } from '$lib/drizzle/schema';

// TODO: Maybe let's put the entire db in separate file?
const pool = createPool({ connectionString: POSTGRES_URL });
const db = drizzle(pool);

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

// FIXME: Should the userId be a number or a string? String probably
export async function createSession(token: string, userId: string): Promise<DrizzleSession> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: DrizzleSession = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	await db.insert(sessionsTable).values(session);
	return session;
}
