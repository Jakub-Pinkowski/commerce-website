import {
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
	boolean,
	numeric,
	integer,
	jsonb
} from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
	id: serial('id').notNull(),
	name: text('name').notNull(),
	handle: text('handle').notNull(),
	category: text('category').notNull(),
	brand: text('brand').notNull(),
	description: text('description').notNull(),
	price: numeric('price').notNull(),
	list_price: numeric('list_price').notNull(),
	in_stock: boolean('in_stock').notNull(),
	inventory_level: integer('inventory_level').notNull(),
	review_count: integer('review_count'),
	review_rating: numeric('review_rating'),
	colors: text('colors').notNull(),
	label: text('label'),
	url: text('url').notNull(),
	imageurl: text('imageurl').notNull(),
	alternate_images: jsonb('alternate_images').notNull()
});

export const usersTable = pgTable('users', {
	id: text('id').primaryKey(),
	email: text('email'),
	password_hash: text('password_hash'),
	github_id: integer('github_id'),
	github_username: text('github_username'),
	google_id: text('google_id'),
	google_picture: text('google_picture'),
	created_at: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull(),
	name: text('name'),
	phone: text('phone'),
	address_street: text('address_street'),
	address_city: text('address_city'),
	address_state: text('address_state'),
	address_postalcode: text('address_postalcode'),
	address_country: text('address_country'),
	points: integer('points').default(0).notNull()
});

export const sessionsTable = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const ordersTable = pgTable('orders', {
    id: serial('id').primaryKey(),
    user_id: text('user_id')
        .notNull()
        .references(() => usersTable.id),
    total_price: numeric('total_price').notNull(),
    status: text('status').notNull(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'date'
    }).notNull()
});

export const orderItemsTable = pgTable('order_items', {
	id: serial('id').primaryKey(),
	order_id: integer('order_id')
		.notNull()
		.references(() => ordersTable.id),
	product_id: integer('product_id')
		.notNull()
		.references(() => productsTable.id),
	quantity: integer('quantity').notNull(),
	price: numeric('price').notNull()
});
