import { GitHub, Google } from 'arctic';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { eq } from 'drizzle-orm';

import { dev } from '$app/environment';
import { db } from '$lib/helpers/drizzle';
import { mapUserNoPassword } from '$lib/helpers/drizzle';
import { usersTable, sessionsTable } from '$lib/drizzle/schema';
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI_DEV,
	GOOGLE_REDIRECT_URI_PROD
} from '$env/static/private';

import type { RequestEvent } from '@sveltejs/kit';
import type { User } from '$lib/types/userTypes';
import type { DrizzleSession } from '$lib/drizzle/schema';

export type SessionValidationResult =
	| { session: DrizzleSession; user: User }
	| { session: null; user: null };

export const generateUserId = (): string => {
	const bytes = new Uint8Array(10);
	crypto.getRandomValues(bytes);
	const userId = encodeBase32LowerCaseNoPadding(bytes);
	return userId;
};

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
	const result = await db
		.select({ drizzleUser: usersTable, session: sessionsTable })
		.from(sessionsTable)
		.innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
		.where(eq(sessionsTable.id, sessionId));

	if (result.length < 1) {
		return { session: null, user: null };
	}

	const { drizzleUser, session } = result[0];

	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(sessionsTable).where(eq(sessionsTable.id, session.id)).execute();
		return { session: null, user: null };
	}

	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db
			.update(sessionsTable)
			.set({ expiresAt: session.expiresAt })
			.where(eq(sessionsTable.id, session.id));
	}

	const user: User = mapUserNoPassword(drizzleUser);

	return { session, user };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
	await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId)).execute();
};

export const setSessionTokenCookie = (
	event: RequestEvent,
	token: string,
	expiresAt: Date
): void => {
	event.cookies.set('session', token, {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		expires: expiresAt
	});
};

export const deleteSessionTokenCookie = (event: RequestEvent): void => {
	event.cookies.set('session', '', {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		maxAge: 0
	});
};
const githubRedirectURI = dev
	? 'http://localhost:5173/login/github/callback'
	: 'https://commerce-website-psi.vercel.app/login/github/callback';
export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, githubRedirectURI);

const googleRedirectURI = dev ? GOOGLE_REDIRECT_URI_DEV : GOOGLE_REDIRECT_URI_PROD;
export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, googleRedirectURI);
