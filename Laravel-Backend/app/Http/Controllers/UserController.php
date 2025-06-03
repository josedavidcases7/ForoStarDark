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
            return $id;  // Devolver solo el id
        } else {
            return null; // Devolver null si no se encuentra
        }
    }

}
