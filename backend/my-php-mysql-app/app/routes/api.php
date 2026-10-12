<?php

use Illuminate\Support\Facades\Route;
use App\Controllers\UserController;

Route::prefix('api')->group(function () {
    Route::post('/users', [UserController::class, 'createUser']);
    Route::get('/users/{id}', [UserController::class, 'getUser']);
    Route::put('/users/{id}', [UserController::class, 'updateUser']);
    Route::delete('/users/{id}', [UserController::class, 'deleteUser']);
});