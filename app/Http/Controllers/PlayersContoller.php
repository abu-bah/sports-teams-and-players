<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\TeamPlayer;
use Illuminate\Http\Request;
use App\Http\Requests\CreatePlayerRequest;
use App\Http\Requests\UpdatePlayerRequest;

class PlayersController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $players = Player::all();
        } catch (\Exception $e) {
            return response()->json([], 400);
        }

        return response()->json(["players" => $players], 200);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $player = Player::findOrFail($id);
        } catch (\Exception $e) {
            return response()->json([], 400);
        }

        return response()->json(["player" => $player], 200);
    }

    /**
     * @param Request $request
     * @param Player $player
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Player $player)
    {
        try {
            $player = \DB::transaction(function () use ($request, $player) {
                $playerRequest = $request->get('player');
                $teamId = $request->get('team_id');

                $firstName = $playerRequest['first_name'];
                $lastName = $playerRequest['last_name'];

                $player->first_name = $firstName;
                $player->last_name = $lastName;

                if ($teamId) {
                    $player->team_id = $teamId;
                }

                $player->save();

                return $player;

            });
        } catch (\Exception $e) {
            return response()->json([], 400);
        }

        return response()->json(['player' => $player], 200);
    }

    /**
     * @param CreatePlayerRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreatePlayerRequest $request)
    {
        try {
            $player = \DB::transaction(function () use ($request) {
                $firstName = $request->get('first_name');
                $lastName = $request->get('last_name');
                $teamId = $request->get('team_id');

                $player = new Player();
                $player->first_name = $firstName;
                $player->last_name = $lastName;

                if ($teamId) {
                    $player->team_id = $teamId;
                }

                $player->save();

                return $player;
            });

            return response()->json(['player' => $player], 200);
        } catch (\Exception $e) {
            return response()->json([], 400);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        try {
            \DB::transaction(function () use ($id) {
                Player::destroy($id);
            });
        } catch (\Exception $e) {
            return response()->json([], 400);
        }

        return response()->json([], 200);
    }
}