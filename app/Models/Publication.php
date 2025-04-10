<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    protected $fillable = ['description', 'likes', 'image', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
