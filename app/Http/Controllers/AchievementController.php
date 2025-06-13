<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AchievementController extends Controller
{

    public function insert(Request $request)
    {
        $request->validate([
            'eventId' => 'required|exists:events,event_id',
            'name' => 'required|string|max:255',
            'image' => 'required|string|max:2097152'
        ]);

        $achievement = new Achievement();
        $achievement->event_id = $request->eventId;
        $achievement->name = $request->name;
        $achievement->image = $request->image;
        $achievement->save();

        return response()->json($achievement, 201);
    }

    public function getAchievementByEventId(Request $request)
    {
        $request->validate([
            'eventId' => 'required|exists:events,event_id'
        ]);

        $achievement = Achievement::where('event_id', $request->eventId)->first();

        if (!$achievement) {
            return response()->json(['message' => 'No se encontró el logro'], 404);
        }

        return response()->json($achievement, 200);
    }

    public function getLastFiveAchievementsByUserId(Request $request)
    {
        try {
            $request->validate([
                'userId' => 'required|exists:users,user_id'
            ]);

            $achievements = Achievement::join('users_achievements', 'achievements.achievement_id', '=', 'users_achievements.achievement_id')
                ->where('users_achievements.user_id', $request->userId)
                ->select('achievements.*')
                ->orderBy('users_achievements.created_at', 'desc')
                ->take(5)
                ->get();

            if ($achievements->isEmpty()) {
                return response()->json(['message' => 'No se encontraron logros'], 404);
            }

            return response()->json($achievements, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
