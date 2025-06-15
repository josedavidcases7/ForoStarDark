<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admins';
    protected $primaryKey = 'admin_id';
    
    protected $fillable = [
        'email',
        'password',
        'user_name',
        'about_me',
        'avatar',
        'header'
    ];
}
