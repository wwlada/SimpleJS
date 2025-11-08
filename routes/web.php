<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductSinglePageController;


Route::resource('/products', ProductController::class)->only(['index', 'store', 'update', 'destroy']);

Route::get('/products-page', [ProductSinglePageController::class, 'index'])->name('products.page');
Route::get('/products-json', [ProductSinglePageController::class, 'getAllProducts']);
Route::get('/products/{id}', [ProductSinglePageController::class, 'getProductById'])->name('products.getById');
Route::post('/products', [ProductSinglePageController::class, 'createProduct']);
Route::put('/products/{id}', [ProductSinglePageController::class, 'updateProduct']);
Route::delete('/products/{id}', [ProductSinglePageController::class, 'deleteProduct']);

