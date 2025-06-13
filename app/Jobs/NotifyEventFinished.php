<?php

namespace App\Jobs;

use App\Events\EventFinished;
use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class NotifyEventFinished implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $event;

    public function __construct(Event $event)
    {
        $this->event = $event;
    }

    public function handle()
    {
        Log::info('Ejecutando NotifyEventFinished job');
        try {
            broadcast(new EventFinished("El evento ha finalizado"))->toOthers();
            Log::info('Evento broadcast enviado correctamente');
        } catch (\Exception $e) {
            Log::error('Error al hacer broadcast del evento: ' . $e->getMessage());
        }
    }
}
