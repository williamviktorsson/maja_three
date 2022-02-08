import { JumpPlayer } from "./player";
import { GetRanksForPlayerRequest, GetRanksForPlayerResponse, CreateLeaderboardRequest, CreateLeaderboardResponse, GetScoresRequest, GetScoresResponse, SubmitScoreRequest, SubmitScoreResponse, DeleteLeaderboardRequest, DeleteLeaderboardResponse } from "./requests";
import { JumpScore, Score } from "./score";
import { Rank, DefaultRank } from "./rank";


import * as express from 'express';
import * as http from 'http';
import { DefaultLeaderboard, Leaderboard } from "./leaderboard";

var server = express();
const app = http.createServer(server);
server.use(express.json())

let leaderboards: Map<string, Leaderboard> = new Map<string, Leaderboard>();

server.post('/leaderboard', async (req, res) => {
    let request: CreateLeaderboardRequest = req.body;

    console.log(request);

    let response: CreateLeaderboardResponse = new CreateLeaderboardResponse();

    if (leaderboards.has(request.leaderboard_id)) {
        response.success = false;
    } else {
        leaderboards.set(request.leaderboard_id, new DefaultLeaderboard(request.leaderboard_id, [], request.save_multiple_scores_per_player))
        response.success = true;
    }



    return res.send(JSON.stringify(response));

});

server.delete('/leaderboard', async (req, res) => {
    let request: DeleteLeaderboardRequest = req.body;

    console.log(request);

    let response: DeleteLeaderboardResponse = new DeleteLeaderboardResponse();

    if (!leaderboards.has(request.leaderboard_id)) {
        response.success = false;
    } else {
        leaderboards.delete(request.leaderboard_id)
        response.success = true;
    }

    return res.send(JSON.stringify(response));

});

server.get('/scores', async (req, res) => {

    // Get requests has no body.
    // Construct GetScoresFromLeaderboardRequest from query params.

    let request: GetScoresRequest = new GetScoresRequest();
    request.leaderboard_id = req.query.leaderboard_id;
    request.start_index = req.query.start_index;
    request.end_index = req.query.end_index;

    console.log(request);


    let response: GetScoresResponse = new GetScoresResponse()

    if (!leaderboards.has(request.leaderboard_id)) {
        response.success = false;
    } else {
        response.success = true;
        let leaderboard: Leaderboard = leaderboards.get(request.leaderboard_id);
        response.scores = leaderboard.scores.slice(request.start_index, request.end_index);
    }

    return res.send(JSON.stringify(response));

});

server.get('/ranks', async (req, res) => {

    // Get requests has no body.
    // Construct GetScoresFromLeaderboardRequest from query params.

    let request: GetRanksForPlayerRequest = new GetRanksForPlayerRequest();
    request.player = JSON.parse(req.query.player);

    console.log(request);


    let response: GetRanksForPlayerResponse = new GetRanksForPlayerResponse()

    response.success = true;
    response.ranks = []

    for (let [leaderboard_id, leaderboard] of leaderboards) {
        let scores: Score[] = leaderboard.scores;
        for (let index = 0; index < scores.length; index++) {
            const score: Score = scores[index];
            if (score.player.id == request.player.id) {
                let rank: Rank = new DefaultRank(index, leaderboard_id, score);
                response.ranks = [rank, ...response.ranks];
            }
        }
    }

    return res.send(JSON.stringify(response));

});

server.post('/scores', async (req, res) => {
    let request: SubmitScoreRequest = req.body;

    console.log(request);

    let response: SubmitScoreResponse = new SubmitScoreResponse();

    if (!leaderboards.has(request.leaderboard_id)) {
        response.success = false;
    } else {
        response.success = true;
        let leaderboard: DefaultLeaderboard = leaderboards.get(request.leaderboard_id) as DefaultLeaderboard;
        if (leaderboard.save_multiple_scores_per_player) {
            leaderboard.scores = [request.score, ...leaderboard.scores]
        } else {
            let index: number = leaderboard.scores.map((score) => score.player.id).indexOf(request.score.player.id);
            if (index != -1) {
                let score: Score = leaderboard.scores[index];
                if (score.value < request.score.value) {
                    leaderboard.scores[index] = request.score;
                }
            } else {
                leaderboard.scores = [request.score, ...leaderboard.scores]
            }
        }
        leaderboard.scores.sort((a, b) => b.value - a.value);
        leaderboards.set(request.leaderboard_id, leaderboard);
        let index: number = leaderboard.scores.map((score) => score).indexOf(request.score);
        let rank: Rank = new DefaultRank(index, leaderboard.id, request.score);
        response.rank = rank;
    }



    return res.send(JSON.stringify(response));

});

app.listen(1337, () => {
    console.log("Server running on port 1337");
});