<?php

namespace App\Http\Controllers;

use App\Models\UserAchievement;
use Illuminate\Http\Request;

class UserAchievementController extends Controller
{
    public function insert(Request $request)
    {
        $request->validate([
            'userId' => 'required|integer|exists:users,user_id',
            'achievementId' => 'required|integer|exists:achievements,achievement_id',
        ]);

        $userAchievement = new UserAchievement();
        $userAchievement->user_id = $request->userId;
        $userAchievement->achievement_id = $request->achievementId;
        $userAchievement->save();

        return response()->json($userAchievement, 201);
    }
}