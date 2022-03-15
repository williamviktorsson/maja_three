import { JumpPlayer } from "./player";
import { CreateLeaderboardRequest, CreateLeaderboardResponse, DeleteLeaderboardRequest, DeleteLeaderboardResponse, GetScoresRequest, GetScoresResponse } from "./requests";
import { JumpScore, Score } from "./score";

import * as express from 'express';
import * as http from 'http';

const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var server = express();
const app = http.createServer(server);

server.use(express.json())

server.post('/leaderboard', async (req, res) => {

    let request: CreateLeaderboardRequest = req.body;
    let response: CreateLeaderboardResponse = new CreateLeaderboardResponse();

    try {
        MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
            if (err) throw err;
            let db = client.db("test");

            try {
                let result = await db.collection("leaderboards").insertOne(
                    {
                        "_id": request.leaderboard_id,
                        "save_multiple_scores_per_player": request.save_multiple_scores_per_player,
                        "scores": []
                    })
                response.success = result.acknowledged;
                return res.send(JSON.stringify(response));
            } catch (error) {
                response.success = false;
                return res.send(JSON.stringify(response));
            }
        });
    } catch (error) {
        response.success = false;
        return res.send(JSON.stringify(response));
    }

});

server.delete('/leaderboard', async (req, res) => {

    let request: DeleteLeaderboardRequest = req.body;
    let response: DeleteLeaderboardResponse = new DeleteLeaderboardResponse();

    try {
        MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
            if (err) throw err;
            let db = client.db("test");

            try {
                let result = await db.collection("leaderboards").deleteOne(
                    {
                        "_id": request.leaderboard_id,
                    })
                response.success = result.acknowledged;
                return res.send(JSON.stringify(response));
            } catch (error) {
                response.success = false;
                return res.send(JSON.stringify(response));
            }
        });
    } catch (error) {
        response.success = false;
        return res.send(JSON.stringify(response));
    }

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



app.listen(1337, () => {
    console.log("Server running on port 1337");
});