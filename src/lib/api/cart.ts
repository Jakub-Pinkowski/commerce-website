import type { CartItem } from '$lib/stores/cart';

export const syncCartWithDatabase = async (userId: string, localCart: CartItem[]) => {
	// const response = await fetch('/api/cart/sync', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify({ userId, localCart })
	// });
	// if (!response.ok) {
	// 	throw new Error('Failed to sync cart with database');
	// }
};

export const fetchCartFromDatabase = async (userId: string): Promise<CartItem[]> => {
	// const response = await fetch(`/api/cart?userId=${userId}`);
	// if (!response.ok) {
	// 	throw new Error('Failed to fetch cart from database');
	// }
	// return response.json();
};
