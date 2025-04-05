<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'login' => 'required|string|max:255',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $data['login'])
            ->orWhere('user_name', $data['login'])
            ->first();

        if ($user && Hash::check($data['password'], $user->password)) {
            $token = $user->createToken("token")->accessToken;

            return response()->json([
                'success' => true,
                'message' => 'El usuario se ha logueado',
                'token' => $token
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'No está autenticado este usuario'
        ], 401);
    }

    public function create(Request $request) {
        $validarUsuario = Validator::make($request->all(), [
            'user_name' => 'required|string|max:10',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);
    
        if ($validarUsuario->fails()) {
            return response()->json(['errors' => $validarUsuario->errors()], 422);
        }
    
       
        $usuario = User::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $usuario->createToken('AuthToken')->accessToken;
        return response()->json([
            'success' => true,
            'message' => 'Usuario registrado correctamente.',
            'user' => $usuario
        ], 201);
    }
}
