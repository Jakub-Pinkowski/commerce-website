# E-commerce Website

**Note:** This project is still a work in progress. New features added regularly.

**Disclaimer:** This website is for demonstration purposes only. It is not a real e-commerce store, and you cannot actually purchase any items.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Cookie Usage](#cookie-usage)
- [Known Issues](#known-issues)

## Features

- Product Management
  - View products
  - Filter products by price, color, brand, and category
  - Sort products by various criteria
- Product Details
  - View detailed product information
  - View product images and alternate images
- Shopping Cart
  - Add to cart, remove from cart, and update cart items
  - View recommended products
- Wishlist
  - Add, remove and update products in wishlist
  - View wishlist items
- Breadcrumb Navigation
  - Navigate through categories using breadcrumbs
- Responsive Design
  - Mobile and desktop support
- User Authentication
  - Register and login with email
  - OAuth login with GitHub and Google
- User Profile
  - View and update user profile information
  - Manage addresses
  - View order history
- Points System
  - Earn points for purchases
  - Redeem points for discounts
- New features coming soon!

## Technologies Used

- Svelte
- SvelteKit
- TypeScript
- Tailwind CSS
- Vite
- DaisyUI
- Online CDN storage via Vercel's Blob Storage
- PostgreSQL for product data storage

## Cookie Usage

Cookies are used in this project for various purposes, including:

- **User Authentication**: Cookies store session information to keep users logged in. This is handled using the `lucia` library.
- **User Profiles**: Cookies help maintain user session data, allowing users to view and update their profile information seamlessly.
- **Orders**: Cookies are used to track user sessions and order details, ensuring that users can view their order history and track their orders.
- **OAuth**: Cookies store state information during the OAuth login process with GitHub and Google.

## Known Issues

- The mobile version may encounter some issues with the current implementation of the website.
- Filtering and sorting products may not work as expected.
- Some subpages may not be fully functional.
