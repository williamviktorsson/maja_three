var express = require("express");
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const cors = require("cors");
var server = express();
const http = require("http").createServer(server);
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8100",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});

server.use(express.json())
server.use(cookieParser());
server.use(express.static('website'))
server.use(cors());


// SET SSR ENGINE
server.set('view engine', 'pug')


server.post('/authentication', async (req, res) => {

    try {
        MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
            if (err) throw err;
            db = client.db("test");
            username = req.body.username;
            password = req.body.password;
            result = await db.collection("authentication").findOne({ 'username': username, 'password': password })

            let json = { authenticated: result != null, username: username };



            if (json.authenticated == true) {

                return res.cookie('token', result._id.toString()).send(JSON.stringify(json));

            } else {
                return res.send(JSON.stringify(json));
            }

        });
    } catch (error) {
        return res.send(error);
    }

});

server.delete('/authentication', async (req, res) => {

    try {
        MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
            if (err) throw err;
            db = client.db("test");

            let token = req.cookies['token']
            let o_id = new ObjectId(token);

            result = await db.collection("authentication").deleteOne({ '_id': o_id })

            if (result) {

                let json = { deleted: true, id: token };

                return res.send(JSON.stringify(json));

            } else {
                return res.send(JSON.stringify({ deleted: false, error: 'ACCOUNT_NOT_FOUND' }));
            }

        });
    } catch (error) {
        return res.send(error);
    }

});


server.get('/landing', (req, res) => {

    if (req.headers.cookie != undefined && req.headers.cookie.includes('token=')) {
        res.sendFile(path.join(__dirname, '/landing.html'));
    } else {
        res.sendFile(path.join(__dirname, '/fail.html'));
    }

})

server.get('/fail', (req, res) => {


    res.sendFile(path.join(__dirname, '/fail.html'));


})

server.get('/test', (req, res) => {
    res.render('test', { title: 'very cool', welcome_data: 'Welcommen' })
})

server.get('/loop_json', (req, res) => {

    // Example: read from file. Might as well be read from database.
    let users = fs.readFileSync(path.join(__dirname, '/students.json'));

    users = JSON.parse(users);

    res.render('loop_json', { title: 'loop dat', header: 'Wilbecommen', users: users })
})

server.get('/ssr', function (req, res) {
    res.render('ssr', { name: 'Test' })
})

server.get("/chat", async (req, res) => {

    try {
        MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
            if (err) throw err;
            db = client.db("test");
            room = req.query.room;
            if (!room) {
                room = "mongodb"
            }
            let result = await db.collection("chat").findOne({ "_id": room });

            if (!result) {
                result = {
                    _id: room,
                    messages: []
                }
            }


            res.set('Cache-Control', 'no-store').render('chat', { name: 'Test', chats: result.messages })





        });
    } catch (error) {
        return res.send(error);
    }

});


io.on("connection", (socket) => {
    socket.on("join", async (gameId) => {

        try {
            MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
                if (err) throw err;
                db = client.db("test");
                let result = await db.collection("chat").findOne({ "_id": gameId });
                if (!result) {
                    await db.collection("chat").insertOne({ "_id": gameId, messages: [] });
                }
                socket.join(gameId);
                socket.emit("joined", gameId);
                socket.activeRoom = gameId;

            });
        } catch (error) {
            console.error(error);
        }

    });
    socket.on("message", (message) => {

        try {
            MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
                if (err) throw err;
                db = client.db("test");

                db.collection("chat").updateOne({ "_id": socket.activeRoom }, {
                    "$push": {
                        "messages": message
                    }
                });
                io.to(socket.activeRoom).emit("message", message);

            });
        } catch (error) {
            console.error(error);
        }
    });
});

http.listen(1337, () => {
    console.log("Server running on port 1337");
});