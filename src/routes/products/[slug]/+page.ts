import type { PageLoad } from './$types';
import products from '$lib/products/products.json';

export const load: PageLoad = async ({ params }) => {
    const product = products.find(p => p.handle === params.slug);
    if (!product) {
        return {
            status: 404,
            error: new Error('Product not found')
        };
    }

    return {
        props: {
            product
        }
    };
};