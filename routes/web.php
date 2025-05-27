<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('welcome');
})->name('home');

Route::prefix('/order')->group(function () {
  Route::get('/service', [OrderController::class, 'service'])->name('order.service');
  Route::get('/contact', [OrderController::class, 'contact'])->name('order.contact');
  Route::get('/summary', [OrderController::class, 'summary'])->name('order.summary');
  Route::get('/payment', [OrderController::class, 'payment'])->name('order.payment');
  Route::get('/confirmation', [OrderController::class, 'confirmation'])->name('order.confirmation');
});

Route::get('/order/tes', function () {
  return Inertia::render('order');
})->name('order.tes');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
