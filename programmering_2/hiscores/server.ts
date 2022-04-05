import { JumpPlayer } from "./player";
import { CreateLeaderboardRequest, CreateLeaderboardResponse, DeleteLeaderboardRequest, DeleteLeaderboardResponse, GetRanksForPlayerRequest, GetRanksForPlayerResponse, GetScoresRequest, GetScoresResponse, SubmitScoreRequest, SubmitScoreResponse } from "./requests";
import { JumpScore, Score } from "./score";

import * as express from 'express';
import * as http from 'http';
import { DefaultRank } from "./rank";

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

server.post('/scores', async (req, res) => {

    let request: SubmitScoreRequest = req.body;
    let response: SubmitScoreResponse = new SubmitScoreResponse();

    try {
        MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
            if (err) throw err;
            let db = client.db("test");

            try {
                let leaderboard = await db.collection("leaderboards").findOne(
                    {
                        "_id": request.leaderboard_id
                    })

                if (leaderboard == null) {
                    response.success = false;
                    return res.send(JSON.stringify(response));

                } else {

                    // check if keep multiple scores or not

                    if (leaderboard.save_multiple_scores_per_player) {
                        leaderboard.scores.push(request.score);
                    } else {

                        // remove all scores belonging to player with lower score than submitted :)
                        leaderboard.scores = leaderboard.scores.filter((e: Score) => e.player.id !== request.score.player.id || e.value >= request.score.value)

                        if (leaderboard.scores.find((score: Score) => score.player.id == request.score.player.id)) {
                            // A higher score exists
                            response.success = false;
                            return res.send(JSON.stringify(response));

                        } else {
                            leaderboard.scores.push(request.score);
                        }

                    }

                    leaderboard.scores.sort((a: Score, b: Score) => b.value - a.value);

                    let index: number = leaderboard.scores.indexOf(request.score);

                    let result = await db.collection("leaderboards").updateOne(
                        {
                            "_id": request.leaderboard_id,
                        },
                        {
                            "$set": {
                                "scores": leaderboard.scores
                            }
                        })
                    response.success = result.acknowledged && index >= 0;
                    response.rank = new DefaultRank(index, request.leaderboard_id, request.score)
                    return res.send(JSON.stringify(response));
                }
            } catch (error) {
                console.log(error);
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

    let request: GetScoresRequest = new GetScoresRequest()
    request.leaderboard_id = req.query.leaderboard_id;
    request.start_index = req.query.start_index;
    request.end_index = req.query.end_index;
    let response: GetScoresResponse = new GetScoresResponse();

    try {
        MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
            if (err) throw err;
            let db = client.db("test");

            try {
                let leaderboard = await db.collection("leaderboards").findOne(
                    {
                        "_id": request.leaderboard_id
                    })
                if (!leaderboard) {
                    response.success = false;
                    return res.send(JSON.stringify(response));
                }

                response.scores = leaderboard.scores.slice(request.start_index, request.end_index)
                return res.send(JSON.stringify(response));
            }
            catch (error) {
                response.success = false;
                return res.send(JSON.stringify(response));
            }
        });


    } catch (error) {
        console.log(error);
        response.success = false;
        return res.send(JSON.stringify(response));
    }

});


server.get('/ranks', async (req, res) => {

    let request: GetRanksForPlayerRequest = new GetRanksForPlayerRequest()
    request.player = JSON.parse(req.query.player)

    let response: GetRanksForPlayerResponse = new GetRanksForPlayerResponse();
    response.ranks = []
    try {
        MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
            if (err) throw err;
            let db = client.db("test");

            try {
                let leaderboards = await db.collection("leaderboards").find().toArray()
                if (!leaderboards) {
                    response.success = false;
                    return res.send(JSON.stringify(response));
                }

                for (let i = 0; i < leaderboards.length; i++) {
                    const element = leaderboards[i];
                    for (let j = 0; j < element.scores.length; j++) {
                        const score: Score = element.scores[j];
                        if (score.player.id == request.player.id) {
                            response.ranks.push(new DefaultRank(j, element._id, score))
                        }
                    }
                }

                response.success = true;

                return res.send(JSON.stringify(response));
            }
            catch (error) {
                response.success = false;
                return res.send(JSON.stringify(response));
            }
        });


    } catch (error) {
        console.log(error);
        response.success = false;
        return res.send(JSON.stringify(response));
    }

});

app.listen(1337, () => {
    console.log("Server running on port 1337");
});