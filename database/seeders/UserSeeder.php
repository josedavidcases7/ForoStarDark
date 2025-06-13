<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'user_name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'password' => Hash::make('password1'),
            ],
            [
                'user_name' => 'Jane Smith',
                'email' => 'jane.smith@example.com',
                'password' => Hash::make('password2'),
            ],
            
        ]);
    }
}
