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
                'user_name' => 'Admin',
                'password' => Hash::make('admin123'),
                'email' => 'admin@example.com',
                'about_me' => 'Administrador del sistema y moderador del foro.',
                'avatar' => 'avatars/admin.png',
                'header' => 'headers/admin-header.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_name' => 'David10',
                'password' => Hash::make('password123'),
                'email' => 'david@example.com',
                'about_me' => 'Apasionado por el desarrollo web y los videojuegos.',
                'avatar' => 'avatars/david.png',
                'header' => 'headers/david-header.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_name' => 'Laura88',
                'password' => Hash::make('securepass456'),
                'email' => 'laura@example.com',
                'about_me' => 'Diseñadora gráfica que ama el frontend.',
                'avatar' => 'avatars/laura.png',
                'header' => 'headers/laura-header.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_name' => 'Carlos22',
                'password' => Hash::make('carlos789'),
                'email' => 'carlos@example.com',
                'about_me' => 'Fanático del backend y las APIs REST.',
                'avatar' => 'avatars/carlos.png',
                'header' => 'headers/carlos-header.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_name' => 'Maria93',
                'password' => Hash::make('mariapass321'),
                'email' => 'maria@example.com',
                'about_me' => 'Le encanta el diseño UI/UX y los proyectos creativos.',
                'avatar' => 'avatars/maria.png',
                'header' => 'headers/maria-header.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_name' => 'Jorge76',
                'password' => Hash::make('jorgepass654'),
                'email' => 'jorge@example.com',
                'about_me' => 'Especialista en bases de datos y seguridad.',
                'avatar' => 'avatars/jorge.png',
                'header' => 'headers/jorge-header.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'password' => Hash::make('password1'),
                'about_me' => null,
                'avatar' => null,
                'header' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_name' => 'Jane Smith',
                'email' => 'jane.smith@example.com',
                'password' => Hash::make('password2'),
                'about_me' => null,
                'avatar' => null,
                'header' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
