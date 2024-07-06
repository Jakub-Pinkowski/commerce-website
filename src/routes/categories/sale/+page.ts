import type { PageLoad } from './$types';
import products from '$lib/products/products.json';

export const load: PageLoad = async () => {
    const saleProducts = products.filter(product => product.price < product.listPrice);
    return {
        products: saleProducts
    };
};