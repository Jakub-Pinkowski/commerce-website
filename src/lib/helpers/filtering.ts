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

// TODO: When adding new facets follow the same pattern as colors
export function getPossibleColors(products: Product[]): string[] {
	return [
		...new Set(
			products
				.flatMap((product) => product.colors)
				.filter((color) => color !== undefined)
				.map((color) => color.charAt(0).toUpperCase() + color.slice(1))
		)
	].sort();
}

export function toggleColor(selectedColors: Set<string>, color: string): Set<string> {
	const newSelectedColors = new Set(selectedColors);
	if (newSelectedColors.has(color)) {
		newSelectedColors.delete(color);
	} else {
		newSelectedColors.add(color);
	}
	return newSelectedColors;
}

export function getPossibleBrands(products: Product[]): string[] {
	return [
		...new Set(
			products
				.flatMap((product) => product.brand)
				.filter((brand) => brand !== undefined)
				.map((brand) => brand.charAt(0).toUpperCase() + brand.slice(1))
		)
	].sort();
}

export function toggleBrand(selectedBrands: Set<string>, brand: string): Set<string> {
	const newSelectedBrands = new Set(selectedBrands);
	if (newSelectedBrands.has(brand)) {
		newSelectedBrands.delete(brand);
	} else {
		newSelectedBrands.add(brand);
	}
	return newSelectedBrands;
}
