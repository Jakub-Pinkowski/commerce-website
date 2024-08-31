import type { PageLoad } from './$types';
import products from '$lib/products/products.json';

export const load: PageLoad = async () => {
    const capsProducts = products.filter(product => product.category === 'caps');
	return {
        products: capsProducts
	};
};
