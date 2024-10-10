import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import { db } from '$lib/helpers/drizzle';
import { usersTable } from '$lib/drizzle/schema';
import {
	validateName,
	validatePhone,
	validateEmail,
	validateAddress,
	verifyPassword,
	validatePassword,
	hashPassword
} from '$lib/helpers/auth';

import type { Actions } from './$types';

export const actions: Actions = {
	changeInfo: async (event) => {
		const formData = await event.request.formData();
		const userId = formData.get('userId');
		const name = formData.get('name');
		const phone = formData.get('phone');
		const email = formData.get('email');

		if (
			typeof userId !== 'string' ||
			typeof name !== 'string' ||
			typeof phone !== 'string' ||
			typeof email !== 'string'
		) {
			return fail(400, {
				message: 'Invalid form data'
			});
		}

		// Check if the name is valid
		const nameValidation = validateName(name);
		if (!nameValidation.valid) {
			return fail(400, {
				message: nameValidation.message
			});
		}

		// Check if the phone is valid
		const phoneValidation = validatePhone(phone);
		if (!phoneValidation.valid) {
			return fail(400, {
				message: phoneValidation.message
			});
		}

		// Check if the email is valid
		const emailValidation = validateEmail(email);
		if (!emailValidation.valid) {
			return fail(400, {
				message: emailValidation.message
			});
		}

		// Check if the email already exists in the database
		const emailQuery = await db.select().from(usersTable).where(eq(usersTable.email, email));
		const existingUser = emailQuery[0];

		if (existingUser && existingUser.id !== userId) {
			return fail(400, {
				message: 'Email already in use'
			});
		}

		// Get the user from the database
		const userQuery = await db.select().from(usersTable).where(eq(usersTable.id, userId));
		const user = userQuery[0];

		// Check if the user exists
		if (!user) {
			return fail(400, {
				message: 'User not found'
			});
		}

		// Update the user's info
		await db
			.update(usersTable)
			.set({
				name,
				phone: phone,
				email
			})
			.where(eq(usersTable.id, userId));

		return {
			status: 'success',
			message: "User's info updated successfully"
		};
	},

	changeAddress: async (event) => {
		const formData = await event.request.formData();
		const userId = formData.get('userId');
		const street = formData.get('street');
		const city = formData.get('city');
		const state = formData.get('state');
		const postalCode = formData.get('postalCode');
		const country = formData.get('country');

		if (
			typeof userId !== 'string' ||
			typeof street !== 'string' ||
			typeof city !== 'string' ||
			typeof state !== 'string' ||
			typeof postalCode !== 'string' ||
			typeof country !== 'string'
		) {
			return fail(400, {
				message: 'Invalid form data'
			});
		}

		// Check if the address is valid
		const validation = validateAddress(street, city, state, postalCode, country);
		if (!validation.valid) {
			return fail(400, {
				message: validation.message
			});
		}

		// Get the user from the database
		const userQuery = await db.select().from(usersTable).where(eq(usersTable.id, userId));
		const user = userQuery[0];

		// Check if the user exists
		if (!user) {
			return fail(400, {
				message: 'User not found'
			});
		}

		// Update the user's address
		await db
			.update(usersTable)
			.set({
				address_street: street,
				address_city: city,
				address_state: state,
				address_postalcode: postalCode,
				address_country: country
			})
			.where(eq(usersTable.id, userId));

		return {
			status: 'success',
			message: "User's address updated successfully"
		};
	},

	changePassword: async (event) => {
		const formData = await event.request.formData();
		const userId = formData.get('userId');
		const oldPassword = formData.get('oldPassword');
		const newPassword = formData.get('newPassword');

		if (
			typeof userId !== 'string' ||
			typeof oldPassword !== 'string' ||
			typeof newPassword !== 'string'
		) {
			return fail(400, {
				message: 'Invalid form data'
			});
		}

		// Check if the new password is valid
		const validation = validatePassword(newPassword);
		if (!validation.valid) {
			return fail(400, {
				message: validation.message
			});
		}

		// Get the user from the database
		const userQuery = await db.select().from(usersTable).where(eq(usersTable.id, userId));
		const user = userQuery[0];

		// Check if the user exists
		if (!user) {
			return fail(400, {
				message: 'User not found'
			});
		}

		// Check if the user has a password or they used SSO
		// TODO: Do something else in this case actually
		if (user.password_hash === null) {
			return fail(400, {
				message: 'User has no password'
			});
		}

		// Check if the old password is correct
		const validPassword = await verifyPassword(user.password_hash, oldPassword);
		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect old password'
			});
		}

		// Hash the new password
		const newPasswordHash = await hashPassword(newPassword);

		// Update the user's password
		await db
			.update(usersTable)
			.set({ password_hash: newPasswordHash })
			.where(eq(usersTable.id, userId));

		return {
			status: 'success',
			message: 'Password channged successfully'
		};
	}
};
