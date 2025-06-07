<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PublicationController extends Controller
{
    public function index()
    {
        return response()->json(Publication::with('user')->get(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|string',
            'image' => 'nullable|string',
            'user_name' => 'required|string',
            'user_profile_image' => 'nullable|string',
        ]);

        try {
            $publication = Publication::create([
                'description' => $request->description,
                'image' => $request->image,
                'likes' => 0,
                'user_name' => $request->user_name,
                'user_profile_image' => $request->user_profile_image,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error guardando publicación',
                'details' => $e->getMessage()
            ], 500);
        }

        return response()->json($publication, 201);
    }

   /* public function toggleLike(Request $request, $id)
    {
        // Usa el usuario autenticado
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        $publication = Publication::find($id);
        if (!$publication) {
            return response()->json(['error' => 'Publicación no encontrada'], 404);
        }

        // Verifica si el usuario ya le dio like
        $alreadyLiked = $publication->likes()->where('user_id', $user->id)->exists();

        if ($alreadyLiked) {
            // Quitar like
            $publication->likes()->detach($user->id);
            // Decrementar contador sin que baje de 0
            $publication->likes = max(0, $publication->likes - 1);
            $publication->save();

            return response()->json(['message' => 'Like removido']);
        } else {
            // Agregar like
            $publication->likes()->attach($user->id);
            $publication->likes++;
            $publication->save();

            return response()->json(['message' => 'Like agregado']);
        }
    }*/
public function like(Request $request, $id)
    {
        $publication = Publication::find($id);
        if (!$publication) {
            return response()->json(['error' => 'Publicación no encontrada'], 404);
        }

        $publication->likes++;
        $publication->save();

        return response()->json(['likes' => $publication->likes]);
    }

    public function show($id)
    {
        $publication = Publication::with('user')->find($id);
        if (!$publication) {
            return response()->json(['error' => 'Publicación no encontrada'], 404);
        }
        return response()->json($publication, 200);
    }
}
