export type User = {
	id?: string;
	email?: string;
	password?: string;
	github_id?: number;
	github_username?: string;
	google_id?: string;
	google_picture?: string;
	created_at: Date;
	name?: string;
	phone_number?: string;
	address?: {
		street: string;
		city: string;
		state: string;
		postalCode: string;
		country: string;
	};
};

export type Address = {
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
};
