<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\PlanetasEstrellasController;

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


Route::get('/check-email/{email}', function ($email) {
    $exists = User::where('email', $email)->exists();
    return response()->json(['exists' => $exists]);
});





Route::get('/users', [UserController::class, 'index']);


Route::delete('users/{user}', [UserController::class, 'destroy']);



Route::post('/publications', [PublicationController::class, 'store']);



Route::post('/publications/{id}/like', [PublicationController::class, 'like']);



Route::get('/publications/search', [PublicationController::class, 'search']);
Route::post('/publications/{id}/like', [PublicationController::class, 'like']);


Route::get('/publications', [PublicationController::class, 'index']);
Route::post('/publications', [PublicationController::class, 'store']);
Route::get('/publications/{id}', [PublicationController::class, 'show']);
Route::put('/publications/{id}', [PublicationController::class, 'update']);
Route::delete('/publications/{id}', [PublicationController::class, 'destroy']);


Route::get('/planetasEstrellas', [PlanetasEstrellasController::class, 'index']);
Route::post('/planetasEstrellas', [PlanetasEstrellasController::class, 'store']);
Route::get('/planetasEstrellas/{id}', [PlanetasEstrellasController::class, 'show']);
Route::put('/planetasEstrellas/{id}', [PlanetasEstrellasController::class, 'update']);
Route::delete('/planetasEstrellas/{id}', [PlanetasEstrellasController::class, 'destroy']);
