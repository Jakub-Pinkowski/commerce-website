import { cart } from '$lib/stores/cart';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, fetch }) => {
	// I'm getting this user from +layout.server.ts
	const user = data?.user;
	let localCart = null;

	// FIXME: Currently it updates only on page refresh, ideally it works after user logs in
	if (typeof window !== 'undefined') {
		const cartItem = localStorage.getItem('cart');
		if (cartItem) {
			try {
				localCart = JSON.parse(cartItem);
			} catch (error) {
				console.error('Error parsing cart JSON:', error);
			}
		}
	}

	if (user && localCart) {
		try {
			const response = await fetch('/api/cart/sync', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ localCart })
			});

			const result = await response.json();
			if (result.localCart) {
				localStorage.setItem('cart', JSON.stringify(result.localCart));
				cart.set(result.localCart);
			}
		} catch (error) {
			console.error('Error updating cart:', error);
		}
	}

    const orders = data?.orders;
    const orderItems = data?.orderItems;
    const products = data?.products;

	return {
		user,
		orders,
		orderItems,
		products
	};
};
