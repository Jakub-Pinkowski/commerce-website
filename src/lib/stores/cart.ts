import { writable } from 'svelte/store';
import type { Product } from '$lib/productTypes.ts';

export interface CartItem extends Product {
	quantity: number;
}

const initialCart: CartItem[] = [];

export const cart = writable<CartItem[]>(initialCart);

export const addToCart = (item: CartItem, quantity: number) => {
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

export const removeFromCart = (id: number) => {
	cart.update((items) => items.filter((item) => item.id !== id));
};

export const updateQuantity = (id: number, quantity: number) => {
	cart.update((items) => {
		const item = items.find((i) => i.id === id);
		if (item) {
			item.quantity = quantity;
		}
		return items;
	});
};

export const clearCart = () => {
	cart.set([]);
};
