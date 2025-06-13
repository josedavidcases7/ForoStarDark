<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Team;
use App\Models\TeamUser;

class TeamController extends Controller
{
    public static function getIdByParams($theme, $teamName)
    {
        $eventId = EventController::getIdByEventName($theme);
        if ($eventId == null) {
            return null;
        }

        $id = Team::where('event_id', $eventId)
            ->where('team_name', $teamName)
            ->value('id');

        return $id;
    }

    public function insert(Request $request)
    {
        $request->validate([
            'eventId' => 'required|integer',
            'teamName' => 'required|string',
        ]);

        $eventId = $request->input('eventId');
        $teamName = $request->input('teamName');

        $team = new Team();
        $team->event_id = $eventId;
        $team->team_name = $teamName;
        $team->save();

        return response()->json($team, 201);
    }

    public function getTeamsByEventId(Request $request): JsonResponse
    {
        $request->validate([
            'eventId' => 'required|integer'
        ]);
        $teams = Team::where('event_id', $request->input("eventId"))->get();


        if ($teams->isEmpty()) {
            return response()->json(null, 404);
        }

        return response()->json($teams, 200);
    }

    public function getTeamNameByUserAndTeam(Request $request): JsonResponse
    {
        $request->validate([
            'userId' => 'required|integer',
            'teamId' => 'required|integer'
        ]);

        $teamUser = TeamUser::where('user_id', $request->userId)
            ->where('team_id', $request->teamId)
            ->first();

        if (!$teamUser) {
            return response()->json(['message' => 'Relación no encontrada'], 404);
        }

        $team = Team::find($teamUser->team_id);

        return response()->json([
            'team_name' => $team->team_name
        ]);
    }
}
