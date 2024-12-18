import { redirect } from '@sveltejs/kit';
import { generateCodeVerifier, generateState } from 'arctic';

import { google } from '$lib/server/session';

import type { RequestEvent } from '@sveltejs/kit';

export const GET = async (event: RequestEvent): Promise<Response> => {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = google.createAuthorizationURL(state, codeVerifier, ['profile', 'email']);

	event.cookies.set('google_oauth_state', state, {
		secure: true,
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10 // 10 min
	});

	event.cookies.set('google_oauth_code_verifier', codeVerifier, {
		secure: true,
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10 // 10 min
	});

	redirect(302, url.toString());
};
