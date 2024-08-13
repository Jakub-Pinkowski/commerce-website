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

export const capitalizeWords = (str: string) => {
	return str.replace(/\b\w/g, (char) => char.toUpperCase());
};
