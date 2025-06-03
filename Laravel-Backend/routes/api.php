<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TeamUserController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ChatController;

Route::post('/users-teams', [TeamUserController::class, 'insert']);
Route::post('/events', [EventController::class, 'insert']);
Route::post('/teams', [TeamController::class, 'insert']);
Route::get('/events/today', [EventController::class, 'getTodayEvent']);
Route::get('/teams/event-teams', [TeamController::class, 'getTeamsByEventId']);
Route::post('/events/message', [EventController::class, 'sendMessage']);
Route::post('/chats', [ChatController::class, 'insert']);
Route::get('/teams/team-name', [TeamController::class, 'getTeamNameByUserAndTeam']);
Route::get('/chats/team-messages', [ChatController::class, 'getTeamMessages']);