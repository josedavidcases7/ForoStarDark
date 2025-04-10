<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Publication;
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
        ]);

        $publication = Publication::create([
            'description' => $request->description,
            'image' => $request->image,
            'likes' => 0,
            'user_id' => Auth::id(), // Asegúrate de que el usuario esté autenticado
        ]);

        return response()->json($publication, 201);
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
