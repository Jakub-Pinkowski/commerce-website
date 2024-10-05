import { writable, derived, get } from 'svelte/store';

import { syncCartWithDatabase, fetchCartFromDatabase } from '$lib/api/cart';

import type { Product } from '$lib//types/productTypes.ts';

export interface CartItem extends Product {
	quantity: number;
}

let initialCart: CartItem[] = [];

if (typeof window !== 'undefined') {
	try {
		const storedCart = localStorage.getItem('cart');
		initialCart = storedCart ? JSON.parse(storedCart) : [];
		console.log('Initial cart from localStorage:', initialCart);
	} catch (error) {
		console.error('Failed to parse cart from localStorage', error);
		initialCart = [];
	}
} else {
	console.log('Running in server environment');
}

export const cart = writable<CartItem[]>(initialCart);

if (typeof window !== 'undefined') {
	cart.subscribe((items) => {
		try {
			localStorage.setItem('cart', JSON.stringify(items));
		} catch (error) {
			console.error('Failed to save cart to localStorage', error);
		}
	});
} else {
    console.log('Running in server environment');
}

export const addToCart = (item: Product, quantity: number) => {
	cart.update((items) => {
		const existingItem = items.find((i) => i.id === item.id);
		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			items.push({ ...item, quantity });
		}
		return items;
	});
};

export const removeFromCart = (item: CartItem) => {
	cart.update((items) => {
		return items.filter((i) => i.id !== item.id);
	});
};

export const increaseQuantity = (item: CartItem, quantity: number) => {
	cart.update((items) => {
		const existingItem = items.find((i) => i.id === item.id);
		if (existingItem) {
			existingItem.quantity += quantity;
		}
		return items;
	});
};

export const decreaseQuantity = (item: CartItem, quantity: number) => {
	if (quantity <= 0) {
		console.warn('Quantity should be a positive integer');
		return;
	}
	cart.update((items) => {
		const existingItem = items.find((i) => i.id === item.id);
		if (existingItem) {
			existingItem.quantity = Math.max(existingItem.quantity - quantity, 1);
		}
		return items;
	});
};

export const totalQuantity = derived(cart, ($cart) =>
	$cart.reduce((total, item) => total + item.quantity, 0)
);

export const syncLocalCartWithDatabase = async (userId: string) => {
	const localCart = get(cart);
	// if (localCart.length > 0) {
	// 	await syncCartWithDatabase(userId, localCart);
	// 	localStorage.removeItem('cart');
	// }
	// const updatedCart = await fetchCartFromDatabase(userId);
	// cart.set(updatedCart);

	// console.log('localCart: ', localCart);
	// console.log('cart: ', cart);
	// console.log('syncLocalCartWithDatabase');
};
