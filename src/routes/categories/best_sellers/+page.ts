import type { PageLoad } from './$types';
import products from '$lib/products/products.json';

export const load: PageLoad = async () => {
    const bestSellerProducts = products.filter(product => product.label === 'best seller');
    return {
        products: bestSellerProducts
    };
};