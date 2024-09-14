import type { Product } from '$lib/types/productTypes';

// Generic delay function
export const delay = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

// Fetch products with optional throttling
export async function fetchProducts(
	products: Product[],
	throttleMs: number = 500
): Promise<Product[]> {
	await delay(throttleMs); // Simulate delay for testing
	if (products) {
		return products;
	} else {
		throw new Error('Products not found');
	}
}

// Filter products for carousel by label
export const filterProductsByLabel = (
	products: Product[],
	label: string,
	productsPerCarousel: number
): Product[] => {
	if (label === 'sale') {
		return products
			.filter((product) => product.price < product.listPrice)
			.slice(0, productsPerCarousel);
	}
	return products.filter((product) => product.label === label).slice(0, productsPerCarousel);
};

// Filter products for carousel by category
export const filterProductsByCategory = (
	products: Product[],
	category: string,
	productsPerCarousel: number
): Product[] => {
	return products.filter((product) => product.category === category).slice(0, productsPerCarousel);
};
