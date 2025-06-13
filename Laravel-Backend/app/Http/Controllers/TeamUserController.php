<?php

namespace App\Http\Controllers;

use App\Models\TeamUser;
use Illuminate\Http\Request;

class TeamUserController extends Controller
{

//4. Dado el id del equipo y el id del usuario inserto el usuario a un equipo de un debate

    public function insert(Request $request)
    {
        $request->validate([
            'theme' => 'required|string',
            'team_name' => 'required|string',
            'user_name' => 'required|string',
        ]);

        $theme = $request->input('theme');
        $teamName = $request->input('team_name');
        $userName = $request->input('user_name');

        $teamId = TeamController::getIdByParams($theme, $teamName);
        $userId = UserController::getIdByUsername($userName);

        if (!$teamId || !$userId) {
            return response()->json(['message' => 'Equipo o usuario no encontrado'], 404);
        }

        $teamUser = new TeamUser();
        $teamUser->user_id = $userId;
        $teamUser->team_id = $teamId;
        $teamUser->save();

        return response()->json($teamUser, 201);
    }
}
