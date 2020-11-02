<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\User;
use App\Models\Team;
use App\Models\Player;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'remember_token' => Str::random(10),
    ];
});

$factory->define(Team::class, function (Faker $faker) {
    $teams = [
        "Atlanta United FC",
        "Chicago Fire FC",
        "Columbus Crew SC",
        "D.C. United",
        "FC Cincinnati",
        "Inter Miami CF",
        "Montreal ImpactS",
        "New England Revolution",
        "New York City FC",
        "New York Red Bulls",
        "Orlando City SC",
        "Philadelphia Union",
        "Toronto FC",
        "FC Dallas",
        "Houston Dynamo",
        "LA Galaxy",
        "Los Angeles FC",
        "Minnesota United FC",
        "Nashville SC",
        "Portland Timbers",
        "Real Salt Lake",
        "San Jose Earthquakes",
        "Seattle Sounders FC",
        "Sporting Kansas City",
        "Vancouver Whitecaps FC"
    ];

    return [
        'name' => $faker->unique()->colorName . ' ' . $faker->randomElement($teams),
    ];
});

$factory->define(Player::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'team_id' => $faker->unique(true)->numberBetween(Team::min('id'), Team::max('id')),
    ];
});
