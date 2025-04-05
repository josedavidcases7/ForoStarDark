<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Message;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    /**
     * Crear una nueva instancia del evento.
     *
     * @param  Message  $message
     * @return void
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * El canal en el que el evento debe ser transmitido.
     *
     * @return Channel
     */
    public function broadcastOn()
    {
        return new Channel('chat');
    }

    /**
     * (Opcional) Datos adicionales a ser enviados al cliente.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
            'user_name' => $this->message->user->user_name,
            'message' => $this->message->message,
            'created_at' => $this->message->created_at,
        ];
    }
}