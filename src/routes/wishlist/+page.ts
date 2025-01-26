import type { PageLoad } from './$types';
import { wishlist } from '$lib/stores/wishlist';

export const load: PageLoad = async () => {
	return {
		wishlist: wishlist
	};
};
