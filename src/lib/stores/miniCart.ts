import { writable } from 'svelte/store';

export const isMiniCartOpen = writable<boolean>(false);

export const toggleMiniCart = (): void => {
	isMiniCartOpen.update((isOpen) => !isOpen);
};

export const openMiniCart = (): void => {
	isMiniCartOpen.set(true);
};

export const closeMiniCart = (): void => {
	isMiniCartOpen.set(false);
};
