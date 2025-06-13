<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;
use Illuminate\Support\Facades\DB;
use App\Events\NewEventMessage;

class ChatController extends Controller
{
    public function insert(Request $request)
    {
        $request->validate([
            'userId' => 'required|exists:users,user_id',
            'message' => 'required|string|max:255',
            'teamId' => 'required|exists:teams,id'
        ]);

        $chat = Chat::create([
            'user_id' => $request->userId,
            'message' => $request->message,
            'team_id' => $request->teamId
        ]);
        $messageData = [
            'text' => $request->message,
            'team_id' => $request->teamId
        ];
        broadcast(new NewEventMessage($messageData))->toOthers();

        return response()->json([
            'message' => 'Chat creado exitosamente',
            'data' => $chat
        ], 201);
    }

    public function getTeamMessages(Request $request)
    {
        $request->validate([
            'idEquipo' => 'required|exists:teams,id'
        ]);

        $messages = DB::table('chats')
            ->join('users', 'chats.user_id', '=', 'users.user_id')
            ->where('chats.team_id', '=', $request->idEquipo)
            ->select('users.user_name', 'chats.message')
            ->orderBy('chats.id', 'asc')
            ->get();

        return response()->json($messages);
    }
}
