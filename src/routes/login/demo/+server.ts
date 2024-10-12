import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import { db } from '$lib/helpers/drizzle';
import { usersTable } from '$lib/drizzle/schema';
import { validateEmailAndPassword, verifyPassword } from '$lib/helpers/auth';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';

import type { RequestEvent } from '@sveltejs/kit';

// export const POST = async (event: RequestEvent): Promise<Response> => {};
