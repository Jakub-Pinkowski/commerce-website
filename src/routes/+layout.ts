import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, fetch }) => {
	// I'm getting this user from +layout.server.ts
	const user = data?.user;
	let cart = null;

	if (typeof window !== 'undefined') {
		const cartItem = localStorage.getItem('cart');
		if (cartItem) {
			try {
				cart = JSON.parse(cartItem);
				console.log('cart from localStorage on the initial load', cart);
			} catch (error) {
				console.error('Error parsing cart JSON:', error);
			}
		}
	}

	if (user && cart) {
		const userId = user.id;
		const response = await fetch('/api/cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ userId, localCart: cart })
		});

		const result = await response.json();
		console.log('result', result);

		if (result.localCart) {
			console.log('result.localCart', result.localCart);
			localStorage.setItem('cart', JSON.stringify(result.localCart));
			cart = result.localCart;
		}
	}
	return {};
};
