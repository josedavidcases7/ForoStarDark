<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamUser extends Model
{
    use HasFactory;

    protected $table = 'teams_users';

    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'team_id',
    ];

    public $timestamps = false;
}
