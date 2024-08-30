import type { PageLoad } from './$types';
import products from '$lib/products/products.json';

export const load: PageLoad = async () => {
    const bikesProducts = products.filter(product => product.category === 'bikes');
	return {
        products: bikesProducts
	};
};
