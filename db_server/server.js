var express = require("express");
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

var server = express();
server.use(express.json())


server.use(express.static('website'))

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

                return res.cookie('token', result._id).send(JSON.stringify(json));

            } else {
                return res.send(JSON.stringify(json));
            }

        });
    } catch (error) {
        return res.send(error);
    }

});

server.get('/landing', (req, res) => {

    if (req.headers.cookie != undefined && req.headers.cookie.includes('token=secret')) {
        res.sendFile(path.join(__dirname, '/landing.html'));
    } else {
        res.sendFile(path.join(__dirname, '/fail.html'));
    }

})

server.get('/fail', (req, res) => {


    res.sendFile(path.join(__dirname, '/fail.html'));


})




server.listen(1337, () => {
    console.log("Server running on port 1337");
});