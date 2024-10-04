import {
	boolean,
	decimal,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	handle: varchar('handle', { length: 255 }).notNull(),
	category: varchar('category', { length: 255 }).notNull(),
	brand: varchar('brand', { length: 255 }).notNull(),
	description: text('description').notNull(),
	price: decimal('price', { precision: 10, scale: 2 }).notNull(),
	list_price: decimal('list_price', { precision: 10, scale: 2 }).notNull(),
	in_stock: boolean('in_stock').notNull(),
	inventory_level: integer('inventory_level').notNull(),
	review_count: integer('review_count'),
	review_rating: decimal('review_rating', { precision: 3, scale: 2 }),
	colors: text('colors').array().notNull(),
	label: varchar('label', { length: 255 }),
	url: varchar('url', { length: 255 }).notNull(),
	imageurl: varchar('imageurl', { length: 255 }).notNull(),
	alternate_images: text('alternate_images').array().notNull(),
	created_at: timestamp('created_at').defaultNow().notNull()
});

// TODO: Add better types later on varchar etc.
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

// TODO: Add better types later on
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

// TODO: Add delivery address, invoice address, payment method, payment status etc.
export const ordersTable = pgTable('orders', {
	id: serial('id').primaryKey(),
	user_id: varchar('user_id')
		.notNull()
		.references(() => usersTable.id),
	total_price: decimal('total_price').notNull(),
	status: varchar('status').notNull(), // CONSTRAINS: 'placed', 'processed', 'dispatched', 'delivered', 'returned', 'cancelled'
	created_at: timestamp('created_at').defaultNow().notNull(),
	updated_at: timestamp('updated_at').defaultNow().notNull(),
	delivery_address_street: varchar('delivery_address_street').notNull(),
	delivery_address_city: varchar('delivery_address_city').notNull(),
	delivery_address_state: varchar('delivery_address_state').notNull(),
	delivery_address_postalcode: varchar('delivery_address_postalcode').notNull(),
	delivery_address_country: varchar('delivery_address_country').notNull(),
	invoice_address_street: varchar('invoice_address_street').notNull(),
	invoice_address_city: varchar('invoice_address_city').notNull(),
	invoice_address_state: varchar('invoice_address_state').notNull(),
	invoice_address_postalcode: varchar('invoice_address_postalcode').notNull(),
	invoice_address_country: varchar('invoice_address_country').notNull(),
	payment_method: varchar('payment_method').notNull(), // CONSTRAINS: 'debit_card, 'credit_card', 'paypal', 'cash_on_delivery'
	payment_status: varchar('payment_status').notNull(), // CONSTRAINS: 'pending', 'completed', 'failed'
	shipping_method: varchar('shipping_method').notNull(), // CONSTRAINS: 'standard', 'express', 'overnight'
	tracking_number: varchar('tracking_number'),
	points: integer('points').notNull(),
	customer_notes: text('customer_notes')
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
	price: decimal('price').notNull()
});
