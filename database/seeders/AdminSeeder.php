<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $admins = [
           
            
          [
                'email' => 'admin2@gmail.com',
                'password' => Hash::make('123456'),
                'user_name' => 'admin2',
                'about_me' => 'Soy el primer admin',
                'avatar' => null,
                'header' => null,
            ]
        ];

        foreach ($admins as $admin) {
            DB::table('admins')->insert($admin);
        }
    }
}
