import type { PageLoad } from './$types';
import products from '$lib/products/products.json';

export const load: PageLoad = async () => {
    const jacketsProducts = products.filter(product => product.category === 'jackets');
	return {
        products: jacketsProducts
	};
};
