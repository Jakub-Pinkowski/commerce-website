import type { Product } from '$lib/productTypes.ts';

export function sortProducts(products: Product[], sortOption: string | null): Product[] {
	if (!sortOption) return products;

	return products.slice().sort((a, b) => {
		switch (sortOption) {
			case 'Price: low to high':
				return a.price - b.price;
			case 'Price: high to low':
				return b.price - a.price;
			default:
				return 0;
		}
	});
}

export function filterProducts(
	products: Product[],
	minPrice: number | null,
	maxPrice: number | null,
	sortOption: string | null,
	selectedColors: Set<string>,
	selectedBrands: Set<string>
): Product[] {
	let filteredProducts = products.filter((product) => {
		const matchesPrice =
			(!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice);
		const matchesColor =
			selectedColors.size === 0 || product.colors.some((color) => selectedColors.has(color));
		const matchesBrand = selectedBrands.size === 0 || selectedBrands.has(product.brand);
		return matchesPrice && matchesColor && matchesBrand;
	});

	return sortProducts(filteredProducts, sortOption);
}

export function getPossibleColors(products: Product[]): string[] {
	const colorSet = new Set<string>();
	products.forEach((product) => {
		product.colors.forEach((color) => {
			if (color) {
				colorSet.add(color.charAt(0).toUpperCase() + color.slice(1));
			}
		});
	});
	return Array.from(colorSet).sort();
}

export function toggleColor(selectedColors: Set<string>, color: string): Set<string> {
	if (selectedColors.has(color)) {
		selectedColors.delete(color);
	} else {
		selectedColors.add(color);
	}
	return selectedColors;
}

export function getPossibleBrands(products: Product[]): string[] {
	const brandSet = new Set<string>();
	products.forEach((product) => {
		if (product.brand) {
			brandSet.add(product.brand.charAt(0).toUpperCase() + product.brand.slice(1));
		}
	});
	return Array.from(brandSet).sort();
}

export function toggleBrand(selectedBrands: Set<string>, brand: string): Set<string> {
	if (selectedBrands.has(brand)) {
		selectedBrands.delete(brand);
	} else {
		selectedBrands.add(brand);
	}
	return selectedBrands;
}
