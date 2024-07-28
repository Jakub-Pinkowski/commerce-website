import { writable } from 'svelte/store';
export const isMiniCartOpen = writable(false);

export const toggleMiniCart = () => {
	isMiniCartOpen.update((isOpen) => !isOpen);
};

export const openMiniCart = () => {
	isMiniCartOpen.set(true);
};

export const closeMiniCart = () => {
	isMiniCartOpen.set(false);
};
