<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Aquí puedes retornar los eventos almacenados o realizar alguna acción
        // Ejemplo: 
        // $events = Event::all();
        // return view('events.index', compact('events'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validación de los datos del formulario
        $request->validate([
            'date_time' => 'required|date',   // Validar la fecha y hora
            'duration' => 'required|integer|min:1|max:1440',  // Validar la duración en minutos (1 a 1440)
            'theme' => 'required|string|max:255',  // Validar que el tema sea una cadena de texto
        ]);

        // Crear un nuevo evento con los datos validados
        $event = Event::create([
            'date_time' => $request->date_time,
            'duration' => $request->duration,
            'theme' => $request->theme,
        ]);

        // Redirigir o devolver una respuesta
        return redirect()->route('events.index')->with('success', 'Evento creado exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Mostrar un evento específico si es necesario
        // Ejemplo:
        // $event = Event::findOrFail($id);
        // return view('events.show', compact('event'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validación de los datos del formulario
        $request->validate([
            'date_time' => 'required|date',   // Validar la fecha y hora
            'duration' => 'required|integer|min:1|max:1440',  // Validar la duración en minutos (1 a 1440)
            'theme' => 'required|string|max:255',  // Validar que el tema sea una cadena de texto
        ]);

        // Buscar el evento a actualizar
        $event = Event::findOrFail($id);

        // Actualizar los datos del evento
        $event->update([
            'date_time' => $request->date_time,
            'duration' => $request->duration,
            'theme' => $request->theme,
        ]);

        // Redirigir o devolver una respuesta
        return redirect()->route('events.index')->with('success', 'Evento actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Eliminar un evento
        $event = Event::findOrFail($id);
        $event->delete();

        // Redirigir o devolver una respuesta
        return redirect()->route('events.index')->with('success', 'Evento eliminado exitosamente');
    }
}
