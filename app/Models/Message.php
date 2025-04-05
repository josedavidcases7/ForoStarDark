<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'message'];

    // Relación con el modelo User (un mensaje pertenece a un usuario)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
