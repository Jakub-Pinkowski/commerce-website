import { fail } from '@sveltejs/kit';
import { hash, verify } from '@node-rs/argon2';

import { lucia } from '$lib/server/auth';

export const validateEmailAndPassword = (
	email: string,
	password: string
): { valid: boolean; message?: string } => {
	if (
		email.length < 3 ||
		email.length > 31 ||
		!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
	) {
		return { valid: false, message: 'Invalid email' };
	}
	if (password.length < 8 || password.length > 255) {
		return { valid: false, message: 'Invalid password' };
	}
	return { valid: true };
};

export const hashPassword = async (password: string): Promise<string> => {
	return await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
};

export const verifyPassword = async (
	hashedPassword: string,
	password: string
): Promise<boolean> => {
	return await verify(hashedPassword, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
};

export const createUserSession = async (userId: string, event: any): Promise<void> => {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
};

export const destroyUserSession = async (event: any): Promise<void> => {
	if (!event.locals.session) {
		console.log('event.locals.session is undefined');
		fail(401); 
		return;
	}
	await lucia.invalidateSession(event.locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
};
