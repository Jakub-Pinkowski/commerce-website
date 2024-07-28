import { writable } from 'svelte/store';
import type { Product } from '$lib/productTypes.ts';

export interface CartItem extends Product {
	quantity: number;
}

let initialCart: CartItem[] = [];

if (typeof window !== 'undefined') {
	const storedCart = localStorage.getItem('cart');
	initialCart = storedCart ? JSON.parse(storedCart) : [];
}

export const cart = writable<CartItem[]>(initialCart);
if (typeof window !== 'undefined') {
	cart.subscribe((items) => {
		localStorage.setItem('cart', JSON.stringify(items));
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
	cart.update((items) => {
		const existingItem = items.find((i) => i.id === item.id);
		if (existingItem) {
			existingItem.quantity = Math.max(existingItem.quantity - quantity, 1);
		}
		return items;
	});
};
