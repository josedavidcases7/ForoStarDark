<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TeamUserController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\AchievementController;
use App\Http\Controllers\UserAchievementController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Http\Controllers\PublicationController;
use App\Models\User;


Route::post('/users-teams', [TeamUserController::class, 'insert']);
Route::post('/events', [EventController::class, 'insert']);
Route::post('/teams', [TeamController::class, 'insert']);
Route::get('/events/today', [EventController::class, 'getTodayEvent']);
Route::get('/teams/event-teams', [TeamController::class, 'getTeamsByEventId']);
Route::post('/events/message', [EventController::class, 'sendMessage']);
Route::post('/chats', [ChatController::class, 'insert']);
Route::get('/teams/team-name', [TeamController::class, 'getTeamNameByUserAndTeam']);
Route::get('/chats/team-messages', [ChatController::class, 'getTeamMessages']);
Route::post('/achievements', [AchievementController::class, 'insert']);
Route::get('/achievements/event', [AchievementController::class, 'getAchievementByEventId']);
Route::post('/users-achievements', [UserAchievementController::class, 'insert']);
Route::get('/users/by-username', [UserController::class, 'getIdByUsernameApi']);
Route::get('/achievements/user-last-five', [AchievementController::class, 'getLastFiveAchievementsByUserId']);
Route::post('/users', [UserController::class, 'create']);
Route::get('/users/admin', [UserController::class, 'getAdminByName']);


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




// routes/api.php
Route::get('/users', [UserController::class, 'index']);


Route::delete('users/{user}', [UserController::class, 'destroy']);



Route::post('/publications', [PublicationController::class, 'store']);



Route::post('/publications/{id}/like', [PublicationController::class, 'like']);


// Rutas personalizadas antes
Route::get('/publications/search', [PublicationController::class, 'search']);
Route::post('/publications/{id}/like', [PublicationController::class, 'like']);

// Manualmente definimos el CRUD sin pisar "search"
Route::get('/publications', [PublicationController::class, 'index']);
Route::post('/publications', [PublicationController::class, 'store']);
Route::get('/publications/{id}', [PublicationController::class, 'show']);
Route::put('/publications/{id}', [PublicationController::class, 'update']);
Route::delete('/publications/{id}', [PublicationController::class, 'destroy']);
