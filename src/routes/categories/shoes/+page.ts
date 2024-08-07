import type { PageLoad } from './$types';
import products from '$lib/products/products.json';

export const load: PageLoad = async () => {
	const shoesProducts = products.filter((product) => product.category === 'shoes');
	return {
		products: shoesProducts
	};
};
