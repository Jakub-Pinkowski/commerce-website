import { fail } from '@sveltejs/kit';
import { hash, verify } from '@node-rs/argon2';

import { lucia } from '$lib/server/auth';

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
	if (password.length < 8 || password.length > 255) {
		return { valid: false, message: 'Password must be between 8 and 255 characters' };
	}
	if (!/[A-Z]/.test(password)) {
		return { valid: false, message: 'Password must contain at least one uppercase letter' };
	}
	if (!/[0-9]/.test(password)) {
		return { valid: false, message: 'Password must contain at least one number' };
	}
	return { valid: true };
};

export const validateName = (name: string): { valid: boolean; message?: string } => {
	if (name.length < 3 || name.length > 31) {
		return { valid: false, message: 'Name must be between 3 and 31 characters' };
	}
	return { valid: true };
};

export const validatePhone = (phone: string): { valid: boolean; message?: string } => {
	if (phone.length < 5 || phone.length > 15) {
		return { valid: false, message: 'Phone number must be between 3 and 31 characters' };
	}
	return { valid: true };
};

export const validateEmail = (email: string): { valid: boolean; message?: string } => {
	if (
		email.length < 3 ||
		email.length > 31 ||
		!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
	) {
		return { valid: false, message: 'Invalid email' };
	}
	return { valid: true };
};

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
		return { valid: false, message: 'Password must be between 8 and 255 characters' };
	}
	if (!/[A-Z]/.test(password)) {
		return { valid: false, message: 'Password must contain at least one uppercase letter' };
	}
	if (!/[0-9]/.test(password)) {
		return { valid: false, message: 'Password must contain at least one number' };
	}
	return { valid: true };
};

export const validateAddress = (
	street: string,
	city: string,
	state: string,
	postalCode: string,
	country: string
): { valid: boolean; message?: string } => {
	if (
		street.length < 3 ||
		street.length > 255 ||
		city.length < 3 ||
		city.length > 255 ||
		state.length < 3 ||
		state.length > 255 ||
		postalCode.length < 3 ||
		postalCode.length > 255 ||
		country.length < 3 ||
		country.length > 255
	) {
		return { valid: false, message: 'Invalid address' };
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