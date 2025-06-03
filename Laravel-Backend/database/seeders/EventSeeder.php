<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    public function run()
    {
        DB::table('events')->insert([
            [
                'date_time' => Carbon::now(),
                'duration' => 120,
                'theme' => '¿Los aliens existen?',
            ],
            [
                'date_time' => Carbon::now()->addDays(1),
                'duration' => 90,
                'theme' => 'Seminario de Web',
            ],
            [
                'date_time' => Carbon::now()->addDays(2),
                'duration' => 180,
                'theme' => 'Taller de Desarrollo',
            ],
            [
                'date_time' => Carbon::now()->addDays(3),
                'duration' => 60,
                'theme' => 'Reunión de Equipos',
            ],
            [
                'date_time' => Carbon::now()->addDays(4),
                'duration' => 150,
                'theme' => 'Charla sobre PHP',
            ],
            [
                'date_time' => Carbon::now()->addDays(5),
                'duration' => 100,
                'theme' => 'Curso de JavaScript',
            ],
            [
                'date_time' => Carbon::now()->addDays(6),
                'duration' => 110,
                'theme' => 'Seminario de React',
            ],
            [
                'date_time' => Carbon::now()->addDays(7),
                'duration' => 140,
                'theme' => 'Workshop de Diseño',
            ],
            [
                'date_time' => Carbon::now()->addDays(8),
                'duration' => 130,
                'theme' => 'Conferencia de UX/UI',
            ],
            [
                'date_time' => Carbon::now()->addDays(9),
                'duration' => 125,
                'theme' => 'Presentación de Proyectos',
            ],
        ]);
    }
}
