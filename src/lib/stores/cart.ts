import { writable, derived, get } from 'svelte/store';
import { user } from '$lib/stores/user';

import type { Product } from '$lib//types/productTypes.ts';

export interface CartItem extends Product {
	quantity: number;
}

let initialCart: CartItem[] = [];

const updateCartInDatabase = async (localCart: CartItem[]) => {
	try {
		const response = await fetch('/api/cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ localCart })
		});

		const result = await response.json();
		if (!response.ok) {
			console.error('Failed to update cart in database');
		}
	} catch (error) {
		console.error('Failed to update cart in database', error);
	}
};

if (typeof window !== 'undefined') {
	try {
		const storedCart = localStorage.getItem('cart');
		initialCart = storedCart ? JSON.parse(storedCart) : [];
	} catch (error) {
		console.error('Failed to parse cart from localStorage', error);
		initialCart = [];
	}
}

export const cart = writable<CartItem[]>(initialCart);

if (typeof window !== 'undefined') {
	cart.subscribe((items) => {
		try {
			localStorage.setItem('cart', JSON.stringify(items));
            const userStore = get(user);
			if (userStore) {
				updateCartInDatabase(items);
			}
		} catch (error) {
			console.error('Failed to save cart to localStorage', error);
		}
	});
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
