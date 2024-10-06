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
		const userId = user.id;
		const response = await fetch('/api/cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ userId, localCart })
		});

		const result = await response.json();
		console.log('result', result);

		if (result.localCart) {
			localStorage.setItem('cart', JSON.stringify(result.localCart));
			localCart = result.localCart;
            cart.set(localCart);
		}
		console.log('localCart', localCart);
	}
	return {};
};
