<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PublicationController;

use App\Models\User;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [UserController::class, 'login']);






Route::post('/register', [UserController::class, 'create']);

Route::resource('events', EventController::class);

Route::middleware('auth:api')->get('/profile', [UserController::class, 'profile']);

Route::get('/check-username/{user_name}', function ($user_name) {
    $exists = User::where('user_name', $user_name)->exists();
    return response()->json(['exists' => $exists]);
});

// Verificar si el correo electrónico existe
Route::get('/check-email/{email}', function ($email) {
    $exists = User::where('email', $email)->exists();
    return response()->json(['exists' => $exists]);
});

Route::apiResource('publications', PublicationController::class);

// routes/api.php
Route::get('/users', [UserController::class, 'index']);


Route::delete('users/{user}', [UserController::class, 'destroy']);
