import type { CartItem } from '$lib/stores/cart';

export const syncLocalCartWithDatabase = async (userId: string, localCart: CartItem[]) => {
	try {
		const response = await fetch('/api/cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ userId, localCart })
		});

		if (!response.ok) {
			throw new Error('Failed to sync cart with database');
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error('Error syncing cart with database:', error);
		throw error;
	}
};

// export const fetchCartFromDatabase = async (userId: string): Promise<CartItem[]> => {
// 	const response = await fetch(`/api/cart?userId=${userId}`);
// 	if (!response.ok) {
// 		throw new Error('Failed to fetch cart from database');
// 	}
// 	return response.json();
// };
