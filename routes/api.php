<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PublicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [UserController::class, 'login']);

Route::post('/register', [UserController::class, 'create']);

Route::post('/publications', [PublicationController::class, 'createPost']);

Route::post( '/messages', [ChatController::class, 'sendMessage']);