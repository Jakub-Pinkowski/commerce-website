import type { PageLoad } from './$types';
import products from '$lib/products/products.json';

export const load: PageLoad = async () => {
    return {
        products
    };
};