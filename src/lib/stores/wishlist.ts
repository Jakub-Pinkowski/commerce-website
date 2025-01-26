import { writable, derived } from 'svelte/store';
import type { Product } from '$lib//types/productTypes.ts';

let initialWishlist: Product[] = [];

if (typeof window !== 'undefined') {
	try {
		const storedWishlist = localStorage.getItem('wishlist');
		initialWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
	} catch (error) {
		console.error('Failed to parse wishlist from localStorage', error);
		initialWishlist = [];
	}
}

export const wishlist = writable<Product[]>(initialWishlist);

if (typeof window !== 'undefined') {
	wishlist.subscribe((items) => {
		try {
			localStorage.setItem('wishlist', JSON.stringify(items));
		} catch (error) {
			console.error('Failed to save wishlist to localStorage', error);
		}
	});
}

export const addToWishlist = (item: Product) => {
	wishlist.update((items) => {
		if (!items.find((i) => i.id === item.id)) {
			items.push(item);
		}
		return items;
	});
};

export const removeFromWishlist = (item: Product) => {
	wishlist.update((items) => {
		return items.filter((i) => i.id !== item.id);
	});
};

export const toggleWishlist = (item: Product) => {
	wishlist.update((items) => {
		if (items.find((i) => i.id === item.id)) {
			return items.filter((i) => i.id !== item.id);
		} else {
			items.push(item);
			return items;
		}
	});
};

export const totalWishlistItems = derived(wishlist, ($wishlist) => $wishlist.length);
