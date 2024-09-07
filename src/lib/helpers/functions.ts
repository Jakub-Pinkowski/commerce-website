// Generic debounce function
export function debounce<T extends (...args: any[]) => void>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: number;
	return function (...args: Parameters<T>) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);capitalizeWords
		timeout = setTimeout(later, wait);
	};
}

// Capitalize the first letter of each word in a string
export const capitalizeWords = (str: string) => {
	return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Capitalize the first letter of a string
export const capitalizeFirstWord = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
