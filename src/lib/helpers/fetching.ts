import type { Product } from '$lib/types/productTypes';

export const filterProductsByLabel = (products: Product[], label: string, productsPerCarousel: number): Product[] => {
    if (label === 'sale') {
        return products
            .filter((product) => product.price < product.listPrice)
            .slice(0, productsPerCarousel);
    }
    return products.filter((product) => product.label === label).slice(0, productsPerCarousel);
};

export const filterProductsByCategory = (products: Product[], category: string, productsPerCarousel: number): Product[] => {
    return products.filter((product) => product.category === category).slice(0, productsPerCarousel);
};