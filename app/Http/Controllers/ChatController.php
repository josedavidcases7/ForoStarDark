<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Message;

class ChatController extends Controller
{
  public function sendMessage(Request $request)
  {
      // Validar la entrada
      $request->validate([
          'user_id' => 'required|exists:users,id',
          'message' => 'required|string',
      ]);

      // Obtener el usuario
      $user = User::find($request->user_id);

      // Crear el mensaje
      $message = Message::create([
          'user_id' => $user->id,
          'message' => $request->message,
      ]);

      // Emitir el evento para broadcasting
      broadcast(new MessageSent($message));

      return response()->json([
          'message' => $message,
      ]);
  }
}
