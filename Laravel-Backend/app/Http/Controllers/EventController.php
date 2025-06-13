<?php

namespace App\Http\Controllers;

use App\Events\NewEventMessage;
use Illuminate\Http\Request;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Jobs\NotifyEventFinished;
use Illuminate\Support\Facades\Config;

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

        // Configurar zona horaria a España
        Config::set('app.timezone', 'Europe/Madrid');
        Carbon::setLocale('es');

        $event = new Event();
        $event->date_time = Carbon::parse($request->input('dateTime'));
        $event->duration = $request->input('duration');
        $event->theme = $request->input('theme');
        $event->save();

        $endTime = Carbon::parse($event->date_time)->addHours($event->duration);
        $now = Carbon::now('Europe/Madrid');
        
        Log::info('Datos del evento:', [
            'evento_id' => $event->event_id,
            'fecha_actual' => $now->format('Y-m-d H:i:s'),
            'fecha_inicio' => $event->date_time,
            'duracion' => $event->duration,
            'fecha_fin' => $endTime->format('Y-m-d H:i:s'),
            'zona_horaria' => $now->timezone->getName()
        ]);

        $delay = $now->diffInSeconds($endTime);

        Log::info('Segundos Delay:', [
            'delay' => $delay,
        ]);

        if ($delay > 0) {
            $dispatchTime = $now->addSeconds($delay);
            Log::info('Programación del job:', [
                'evento_id' => $event->event_id,
                'fecha_actual' => $now->format('Y-m-d H:i:s'),
                'fecha_fin' => $endTime->format('Y-m-d H:i:s'),
                'delay_segundos' => $delay,
                'hora_disparo' => $dispatchTime->format('Y-m-d H:i:s'),
                'zona_horaria' => $dispatchTime->timezone->getName()
            ]);

            NotifyEventFinished::dispatch($event)
                ->delay($dispatchTime)
                ->onQueue('default');
        }

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
