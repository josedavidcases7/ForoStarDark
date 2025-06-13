<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public static function getIdByUsername($username)
    {
        $id = User::where('user_name', $username)->value('user_id');
        if ($id != null) {
            return $id;
        } else {
            return null;
        }
    }

    public function getIdByUsernameApi(Request $request)
    {
        $username = $request->query('username');

        $id = User::where('user_name', $username)->value('user_id');

        if ($id != null) {
            return response()->json(['user_id' => $id], 200);
        }
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }
}
