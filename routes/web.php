<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'Index'])->name('dashboard');

    // Category
    Route::get('categories', [CategoryController::class, 'Index'])->name('categories');
    Route::prefix('categories')->name('categories.')->group(function () {
        Route::post('add', [CategoryController::class, 'addCategory'])->name('add');
        Route::delete('delete', [CategoryController::class, 'deleteCategory'])->name('delete');
        Route::put('update/{id}', [CategoryController::class, 'updateCategory'])->name('update');
        Route::put('status-change/{id}', [CategoryController::class, 'statusChange'])->name('status-change');
    });

    // Expense
    Route::get('expenses', [ExpenseController::class, 'Index'])->name('expenses');
    Route::prefix('expenses')->name('expenses.')->group(function () {
        Route::post('add', [ExpenseController::class, 'addExpense'])->name('add');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
