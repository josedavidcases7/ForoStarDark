<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PlanetasEstrellas;

class PlanetasEstrellasController extends Controller
{
    public function index()
    {
        return response()->json(PlanetasEstrellas::with('user')->get(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'user_name' => 'required|string',
            'user_profile_image' => 'nullable|string',
        ]);

        try {
            $publication = PlanetasEstrellas::create([
                'title' => $request->title,
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


    public function like(Request $request, $id)
    {
        $publication = PlanetasEstrellas::find($id);
        if (!$publication) {
            return response()->json(['error' => 'Publicación no encontrada'], 404);
        }

        $publication->likes++;
        $publication->save();

        return response()->json(['likes' => $publication->likes]);
    }

    public function show($id)
    {
        $publication = PlanetasEstrellas::with('user')->find($id);
        if (!$publication) {
            return response()->json(['error' => 'Publicación no encontrada'], 404);
        }
        return response()->json($publication, 200);
    }

    public function search(Request $request)
    {
        $query = $request->query('query');

        $results = PlanetasEstrellas::where('title', 'like', '%' . $query . '%')->get();

        return response()->json($results, 200);
    }

    public function destroy($id)
    {
        $publication = PlanetasEstrellas::find($id);

        if (!$publication) {
            return response()->json(['message' => 'Publicación no encontrada'], 404);
        }

        $publication->delete();

        return response()->json(['message' => 'Publicación eliminada correctamente']);
    }
}
