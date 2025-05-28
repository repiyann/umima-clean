# Chat Interaction Platform - Kabupaten Bandung

## Description

Umima Clean is a web-based application developed as part of a final project (undergraduate thesis) aimed at creating an efficient, user-friendly platform for ordering and paying for home cleaning services online. The system is designed to simplify the service reservation process for customers while streamlining order and payment management for the service provider.

## Features

1. User Registration & Login – Secure authentication for customers and admins
2. Service Booking – Real-time scheduling and service selection
3. Online Payment – Integration with digital payment gateways (e.g., [specify if any: QRIS, Midtrans, etc.]) (WIP)
4. Order Management – Track, update, and manage customer orders (WIP)
5. Admin Dashboard – View transactions, manage services, monitor bookings (WIP)
6. Responsive UI – Mobile-friendly interface for both customers and admins

### Built With

- [Laravel](https://laravel.com/)
- [Inertia](https://inertiajs.com/)
- [ReactJS](https://vite.dev/)

# Getting Started

## Dependencies

You need to use Composer and npm to install any depedencies like Laravel and TailwindCSS.

You could go to [Composer](https://getcomposer.org/) and [npm](https://www.npmjs.com/) sites for proper installation.

## Installation

1. Install Composer dependencies `composer install`
2. Install npm dependencies `npm install`
3. Create a copy of your .env file `cp .env.example .env`
4. Generate an app encryption key `php artisan key:generate`
5. Create an empty database.
6. In the .env file, add database information to allow Laravel to connect to the database.
7. Migrate the database `php artisan migrate`
8. Seed the database `php artisan db:seed`

## Executing Program

1. Run Laravel `composer run dev`
2. Open http://localhost:8000 with your browser to see the result.

# TODO

Current progress and upcoming features:
- [x] User Auth
- [x] Service Booking
- [x] Pin User's Location
- [ ] Online Payment Integration
- [ ] Order Management System
- [ ] Admin Dashboard

## Project Context

This project was developed as part of a Bachelor's thesis at UNIKOM, with the goal of digitalizing the traditional service ordering process and improving customer satisfaction through online accessibility.

# Author

- GitHub: [@repiyann](https://github.com/repiyann)
- Instagram: [@repiyann](https://instagram.com/repiyann)
