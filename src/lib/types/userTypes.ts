export type User = {
	id?: string;
	email?: string;
	password?: string;
	github_id?: number;
	github_username?: string;
	google_id?: string;
	google_picture?: string;
    created_at: Date;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	address?: {
		street: string;
		city: string;
		state: string;
		postalCode: string;
		country: string;
	};
};