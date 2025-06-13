<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PlanetasEstrellas extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'description',
        'image',
        'likes',
        'user_name',
        'user_profile_image',
    ];

    

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
