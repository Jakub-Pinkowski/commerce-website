import type { PageLoad } from './$types';
import products from '$lib/products/products.json';

export const load: PageLoad = async () => {
    const backpacksProducts = products.filter(product => product.category === 'backpacks');
	return {
        products: backpacksProducts
	};
};
