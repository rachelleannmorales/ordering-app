# Laravel Inertia React Application
## Technical Stack :star2:

The application used laravel/breeze to install react and intertiaJs. I use

#### Libraries used
- InertiaJs
- Reactjs: used for building frontend pages
- Antd: design system
- tailwind css: css framework
- react-infinite-scroller: used for lazy loading
- ses: mailer
- laravel/sail - to dockerize the application

## Features :dancer:
- User Login and registration: This is a buit-in feature on laravel
- Users Page - display a list of all users and provide an option to view a list of orders that belong to each user.
- Products Page - lists all the products and allows the user to create, edit and delete a specific product.
- Orders Page - lists all the orders and allows the user to view the order details and delete a specific order.
- Order Details page - display order information such as User, order details, products, and transactions
- Events
    - Welcome email - user will receive a welcome email after successful registration
    - Order created email - user will receive an email after successful order creation

## Decision-Making :thinking:
One of the key decisions made for the delivery of this project is dockerization. The project being dockerized made it easier to deploy without the reviewer having to install resources like the database and be agnostic in any operating system. The other libraries I have chosen is due to my familiarity to those.

## Installation :gear:
1. Clone this repository
3. Install dependencies with `composer install`
3. Start the application with `./vendor/bin/sail up`