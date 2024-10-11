import { encodeBase32LowerCaseNoPadding, encodeBase32, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';

import { db } from '$lib/helpers/drizzle';
import { usersTable, sessionsTable } from '$lib/drizzle/schema';

import type { DrizzleUser, DrizzleSession } from '$lib/drizzle/schema';

export const generateSessionToken = (): string => {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
};

// FIXME: Should the userId be a number or a string? String probably
export const createSession = async (token: string, userId: string): Promise<DrizzleSession> => {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: DrizzleSession = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
	};
	await db.insert(sessionsTable).values(session);
	return session;
};
