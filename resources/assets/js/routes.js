import Home from "./components/Home";
import Login from "./components/auth/Login";

import TeamsHome from "./components/teams/TeamsHome";
import TeamsList from "./components/teams/TeamsList";
import NewTeam from "./components/teams/NewTeam";
import Team from "./components/teams/Team";

import PlayersHome from "./components/players/PlayersHome";
import PlayersList from "./components/players/PlayersList";
import NewPlayer from "./components/players/NewPlayer";
import Player from "./components/players/Player";
import Register from "./components/users/Register";

export const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            mustAuth: true
        }

    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/teams',
        component: TeamsHome,
        meta: {
            mustAuth: true
        },
        children: [
            {
                path: '/',
                component: TeamsList
            },
            {
                path: 'new',
                component: NewTeam
            },
            {
                path: ':id',
                component: Team
            },
        ]
    },
    {
        path: '/players',
        component: PlayersHome,
        meta: {
            mustAuth: true
        },
        children: [
            {
                path: '/',
                component: PlayersList
            },
            {
                path: 'new',
                component: NewPlayer
            },
            {
                path: ':id',
                component: Player
            },

        ]

    }
];