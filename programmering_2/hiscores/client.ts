import { CreateLeaderboardRequest, CreateLeaderboardResponse, GetScoresRequest, GetScoresResponse } from "./requests";
import { JumpScore, Score } from "./score";

import * as fetch from 'node-fetch';

async function create_leaderboard() {

    let request: CreateLeaderboardRequest = new CreateLeaderboardRequest();
    request.leaderboard_id = "test"
    request.save_multiple_scores_per_player = false;

    await fetch(`http://localhost:1337/leaderboard`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(request)


    })
        .then((response) => response.json())
        .then((data) => {
            if (!data) throw null;

            let response: CreateLeaderboardResponse = data;

            let created: boolean = response.success

            console.log(created);


        })
        .catch((error) => {
            console.log(error);
        });

}

async function get_scores_from_leaderboard() {

    let request: GetScoresRequest = new GetScoresRequest();
    request.leaderboard_id = "test"
    request.start_index = 0;
    request.end_index = 20;

    await fetch(`http://localhost:1337/scores?leaderboard_id=${request.leaderboard_id}&start_index=${request.start_index}&end_index=${request.end_index}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },

    })
        .then((response) => response.json())
        .then((data) => {
            if (!data) throw null;

            let response: GetScoresResponse = data;

            let score: Score = response.scores.pop();

            console.log(score);


        })
        .catch((error) => {
            console.log(error);
        });

}

create_leaderboard()
get_scores_from_leaderboard();
