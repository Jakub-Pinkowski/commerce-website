import { encodeBase32LowerCaseNoPadding, encodeBase32, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { eq } from 'drizzle-orm';

import { db } from '$lib/helpers/drizzle';
import { usersTable, sessionsTable } from '$lib/drizzle/schema';

import type { DrizzleUser, DrizzleSession } from '$lib/drizzle/schema';

export interface MinimalUser {
	id: string;
}
export type SessionValidationResult =
	| { session: DrizzleSession; user: MinimalUser }
	| { session: null; user: null };

export const generateSessionToken = (): string => {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
};

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

export const validateSessionToken = async (token: string): Promise<SessionValidationResult> => {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const row = await db
		.select({
			sessionId: sessionsTable.id,
			userId: sessionsTable.userId,
			expiresAt: sessionsTable.expiresAt,
			appUserId: usersTable.id
		})
		.from(sessionsTable)
		.innerJoin(usersTable, eq(usersTable.id, sessionsTable.userId))
		.where(eq(sessionsTable.id, sessionId))
		.limit(1)
		.execute();

	if (row === null) {
		return { session: null, user: null };
	}

	const { sessionId: id, userId, expiresAt, appUserId } = row[0];

	const session: DrizzleSession = {
		id,
		userId,
		expiresAt: new Date(Number(expiresAt) * 1000)
	};

	const user: MinimalUser = {
		id: appUserId
	};

	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(sessionsTable).where(eq(sessionsTable.id, session.id)).execute();
		return { session: null, user: null };
	}

	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db
			.update(sessionsTable)
			.set({ expiresAt: session.expiresAt })
			.where(eq(sessionsTable.id, session.id))
			.execute();
	}

	return { session, user };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
	await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId)).execute();
};
