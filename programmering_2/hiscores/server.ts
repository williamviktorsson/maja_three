import { JumpPlayer } from "./player";
import { CreateLeaderboardRequest, CreateLeaderboardResponse, GetScoresRequest, GetScoresResponse } from "./requests";
import { JumpScore, Score } from "./score";

var express = require("express");
var server = express();
const http = require("http").createServer(server);

server.use(express.json())

server.post('/leaderboard', async (req, res) => {

    let request: CreateLeaderboardRequest = req.body;

    console.log(request);

    let response: CreateLeaderboardResponse = new CreateLeaderboardResponse();

    response.success = true;

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


    response.scores = [new JumpScore(30, new Date(), new JumpPlayer("goku", 9001)),]
    response.success = true;

    return res.send(JSON.stringify(response));

});



http.listen(1337, () => {
    console.log("Server running on port 1337");
});