<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminChat extends Model
{
    use HasFactory;

    protected $table = 'admins_chats';

    protected $primaryKey = 'id';

    protected $fillable = [
        'admin_event_id',
        'message',
    ];

    public $timestamps = false;
}
