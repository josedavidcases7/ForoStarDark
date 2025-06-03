<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('teams')->insert([
            [
                'event_id' => 1,
                'team_name' => 'Equipo 1'
            ],
            [
                'event_id' => 1,
                'team_name' => 'Equipo 2'
            ]
        ]);
    }
}
