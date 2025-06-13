<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminEvent extends Model
{
    use HasFactory;

    protected $table = 'admins_events';

    protected $primaryKey = 'id';

    protected $fillable = [
        'admin_id',
        'event_id',
    ];

    public $timestamps = false;
}
