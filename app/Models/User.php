<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // Asegúrate de que esto esté correcto
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;


// Definir la clave primaria como 'user_id'
protected $primaryKey = 'user_id'; // Cambiar a 'user_id'

// Si la clave primaria no es un número entero
protected $keyType = 'int'; // Esto es opcional si la clave primaria es de tipo entero

// Si la tabla no tiene timestamps, usa esta línea
public $timestamps = true;

    protected $fillable = [
        'user_name', 'email', 'password', 'about_me', 'avatar', 'header'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}

