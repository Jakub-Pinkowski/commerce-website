// Generic debounce function
export const debounce = <T extends (...args: any[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void => {
    let timeout: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Capitalize the first letter of each word in a string
export const capitalizeWords = (str: string) => {
	return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Capitalize the first letter of a string
export const capitalizeFirstWord = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Capitalize the firt letter and remove underscores from a string
export const formatString = (str: string) => {
    return capitalizeFirstWord(str.replace(/_/g, ' '));
};
