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
}
