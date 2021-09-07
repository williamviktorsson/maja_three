var express = require("express");
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

var server = express();
server.use(express.json())

let database = {
    william: "secret"
}

server.use(express.static('website'))

server.post('/authentication', async (req, res) => {

    let json = {
        authenticated: database[req.body.username]==req.body.password,
        username: req.body.username,
    }

    if (json.authenticated == true) {
        return res.cookie('token', 'secret', { maxAge: 10800 }).send(JSON.stringify(json));

    } else {
        return res.send(JSON.stringify(json));
    }

});

server.get('/landing', (req, res) => {

    if (req.headers.cookie != undefined && req.headers.cookie.includes('token=secret')) {
        res.sendFile(path.join(__dirname, '/landing.html'));
    } else {
        res.sendFile(path.join(__dirname, '/fail.html'));
    }

})



server.listen(1337, () => {
    console.log("Server running on port 1337");
});