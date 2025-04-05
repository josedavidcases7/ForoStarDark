<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Publication;

class PublicationController extends Controller
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

    public function createPost(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // La imagen es opcional
        ]);

        // Manejo de la imagen si es enviada
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('publications', 'public'); // Guarda en storage/public/publications
        }

        // Crear la publicación
        $publication = Publication::create([
            'description' => $request->description,
            'likes' => 0, // Se inicializa en 0
            'image' => $imagePath,
        ]);

        // Responder con la publicación creada
        return response()->json([
            'message' => 'Publicación creada exitosamente',
            'publication' => $publication
        ], 201);
    }
    
}
