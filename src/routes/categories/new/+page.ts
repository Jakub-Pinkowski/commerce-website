import type { PageLoad } from './$types';
import products from '$lib/products/products.json';

export const load: PageLoad = async () => {
    const newProducts = products.filter(product => product.label === 'new');
    return {
        products: newProducts
    };
};