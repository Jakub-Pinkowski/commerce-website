import type { Product } from '$lib//types/productTypes.ts';

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

// Generic function to filter products by any attribute
function filterByAttribute<T>(
	products: Product[],
	attribute: keyof Product,
	values: Set<T> | [number | null, number | null]
): Product[] {
	if (Array.isArray(values)) {
		const [min, max] = values;
		return products.filter((product) => {
			const value = product[attribute];
			return typeof value === 'number' && (!min || value >= min) && (!max || value <= max);
		});
	} else {
		// If the values set is empty, return all products
		if (values.size === 0) {
			return products;
		}
		return products.filter((product) => {
			const value = product[attribute];
			if (Array.isArray(value)) {
				return value.some((v) => values.has(v as unknown as T));
			} else {
				return values.has(value as unknown as T);
			}
		});
	}
}

// Generic function to apply multiple filters to products
function applyFilters(
	products: Product[],
	filters: ((products: Product[]) => Product[])[]
): Product[] {
	return filters.reduce((filteredProducts, filter) => filter(filteredProducts), products);
}

// Filter products by price, color, brand, and category
export function filterProducts(
	products: Product[],
	minPrice: number | null,
	maxPrice: number | null,
	sortOption: string | null,
	selectedColors: Set<string>,
	selectedBrands: Set<string>,
	selectedCategories: Set<string>
): Product[] {
	const filters = [
		(products: Product[]) => filterByAttribute(products, 'price', [minPrice, maxPrice]),
		(products: Product[]) => filterByAttribute(products, 'colors', selectedColors),
		(products: Product[]) => filterByAttribute(products, 'brand', selectedBrands),
		(products: Product[]) => filterByAttribute(products, 'category', selectedCategories)
	];

	let filteredProducts = applyFilters(products, filters);
	return sortProducts(filteredProducts, sortOption);
}

// Generic function to get possible values and their counts for any attribute
function getPossibleValues(products: Product[], attribute: keyof Product): Record<string, number> {
	const valueCounts: Record<string, number> = {};

	products.forEach((product) => {
		const values = product[attribute];
		if (Array.isArray(values)) {
			values.forEach((value) => {
				valueCounts[value] = (valueCounts[value] || 0) + 1;
			});
		} else {
			const value = values as string;
			valueCounts[value] = (valueCounts[value] || 0) + 1;
		}
	});

	// Convert to array, sort alphabetically, and convert back to object
	const sortedValueCounts = Object.fromEntries(
		Object.entries(valueCounts).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
	);

	return sortedValueCounts;
}

// Generic function to toggle selection for any attribute
function toggleSelection(selectedSet: Set<string>, value: string): Set<string> {
	if (selectedSet.has(value)) {
		selectedSet.delete(value);
	} else {
		selectedSet.add(value);
	}
	return selectedSet;
}

// Category filtering using generic functions
export function getPossibleColors(products: Product[]): Record<string, number> {
	return getPossibleValues(products, 'colors');
}

export function toggleColor(selectedColors: Set<string>, color: string): Set<string> {
	return toggleSelection(selectedColors, color);
}

export function getPossibleBrands(products: Product[]): Record<string, number> {
	return getPossibleValues(products, 'brand');
}

export function toggleBrand(selectedBrands: Set<string>, brand: string): Set<string> {
	return toggleSelection(selectedBrands, brand);
}

export function getPossibleCategories(products: Product[]): Record<string, number> {
	return getPossibleValues(products, 'category');
}

export function toggleCategory(selectedCategories: Set<string>, category: string): Set<string> {
	return toggleSelection(selectedCategories, category);
}
