import type { Product } from '$lib/types/productTypes';

// Generic delay function
export const delay = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

// Get imgix URL for image resizing
export const getImgixUrl = (url: string, width: number, format: string = 'webp') => {
	const baseUrl = 'commercewebsite-633103942.imgix.net';
	const path = new URL(url).pathname.substring(1); // Remove the leading '/'
	return `https://${baseUrl}/${path}?w=${width}&fm=${format}`;
};

// Generate srcset for imgix images
export const generateImgixSrcSet = (url: string, widths: number[], format: string = 'webp') => {
	return widths
		.map((width) => {
			return `${getImgixUrl(url, width, format)} ${width}w`;
		})
		.join(', ');
};

// Fetch a single product with optional throttling
export async function fetchProduct(product: Product, throttleMs: number = 500): Promise<Product> {
	await delay(throttleMs);
	if (product) {
		return product;
	} else {
		throw new Error('Product not found');
	}
}

// Fetch products with optional throttling
export async function fetchProducts(
	products: Product[],
	throttleMs: number = 500
): Promise<Product[]> {
	await delay(throttleMs);
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
