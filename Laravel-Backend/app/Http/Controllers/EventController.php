<?php

namespace App\Http\Controllers;

use App\Events\NewEventMessage;
use Illuminate\Http\Request;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EventController extends Controller
{
    public static function getIdByEventName($theme)
    {
        $id = Event::where('theme', $theme)->value('event_id');
        return $id;
    }

    public function insert(Request $request)
    {
        $request->validate([
            'dateTime' => 'required|date',
            'duration' => 'required|integer',
            'theme' => 'required|string',
        ]);

        $dateTime = $request->input('dateTime');
        $duration = $request->input('duration');
        $theme = $request->input('theme');


        $event = new Event();
        $event->date_time = $dateTime;
        $event->duration = $duration;
        $event->theme = $theme;
        $event->save();

        return response()->json($event, 201);
    }

    public function getTodayEvent(): JsonResponse
    {
        $now = Carbon::now();

        $eventoHoy = Event::whereDate('date_time', Carbon::today())
            ->where(DB::raw("DATE_ADD(date_time, INTERVAL duration HOUR)"), '>', $now)
            ->orderBy('date_time', 'asc')
            ->first();

        if ($eventoHoy) {
            return response()->json($eventoHoy, 200);
        } else {
            return response()->json(null, 404);
        }
    }

    // public function sendMessage(Request $request)
    // {
    //     $data = $request->validate([
    //         'message' => 'required|string',
    //     ]);

    //     Log::info('Mensaje recibido: ' . $data['message']);
        
    //     $event = new NewEventMessage($data['message']);
    //     Log::info('Evento creado:', [
    //         'channel' => $event->broadcastOn()->name,
    //         'event' => get_class($event)
    //     ]);
        
    //     broadcast($event);

    //     return response()->json([
    //         'success' => true,
    //         'message' => $data['message']
    //     ]);
    // }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        // Enviar el evento
        broadcast(new NewEventMessage($request->message))->toOthers();
        Log::info('Evento emitido:', ['mensaje' => $request->message]);

        return response()->json(['status' => 'Mensaje enviado']);

    }
}
