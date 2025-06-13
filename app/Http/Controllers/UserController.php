<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB; // Importa DB


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(User::all());

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
    public function destroy($userId)
    {
        try {
            // Buscar al usuario por el ID
            $user = User::findOrFail($userId);

            // Eliminar el usuario
            $user->delete();

            return response()->json(['message' => 'Usuario eliminado con éxito'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al eliminar el usuario', 'error' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        // Validar los datos de entrada
        $data = $request->validate([
            'login' => 'required|string|max:255',
            'password' => 'required|string'
        ]);

        // Intentamos encontrar al usuario en la tabla 'users' o 'admins'
        $user = DB::table('users')
                  ->where('email', $data['login'])
                  ->orWhere('user_name', $data['login'])
                  ->first();

        // Si no encontramos al usuario en la tabla de 'users', buscamos en 'admins'
        if (!$user) {
            $user = DB::table('admins')
                      ->where('email', $data['login'])
                      ->orWhere('user_name', $data['login'])
                      ->first();
            $isAdmin = true; // Marcar como administrador
        } else {
            $isAdmin = false; // Usuario normal
        }

        // Verificamos si encontramos al usuario
        if ($user && Hash::check($data['password'], $user->password)) {
            // Generamos el token y retornamos la respuesta con el tipo de usuario
            return response()->json([
                'success' => true,
                'message' => $isAdmin ? 'Administrador logueado correctamente' : 'Usuario logueado correctamente',
                'user_name' => $user->user_name,
                'isAdmin' => $isAdmin,  // Indicamos si es admin o no
            ], 200);
        }

        // Si las credenciales son incorrectas
        return response()->json([
            'success' => false,
            'message' => 'Correo electrónico o contraseña incorrectos'
        ], 401);
    }
    public function create(Request $request)
    {
        // Validar los datos del usuario
        $validarUsuario = Validator::make($request->all(), [
            'user_name' => 'required|string|max:10',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        // Si la validación falla, devolver un error 422
        if ($validarUsuario->fails()) {
            return response()->json(['errors' => $validarUsuario->errors()], 422);
        }

        // Crear el usuario
        $usuario = User::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // No generamos un token aquí, solo devolvemos el usuario registrado
        return response()->json([
            'success' => true,
            'message' => 'Usuario registrado correctamente.',
            'user' => $usuario
        ], 201);
    }

    /**
     * Obtener el perfil del usuario autenticado.
     */
    public function profile(Request $request)
    {
        // Devolver la información del usuario autenticado
        return response()->json(Auth::user());
    }
}
