var express = require("express");
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

var app = express();
app.use(express.static('public'))
app.use(express.json())

let database = {
    william: "secret"
}

app.post('/authentication', async (req, res) => {

    let json = {
        authenticated: database[req.body.username]==req.body.password,
        username: req.body.username,
    }

    return res.cookie('token', 'secret', { maxAge: 10800 }).send(JSON.stringify(json));
});

app.get('/landing', (req, res) => {
    if (req.headers.cookie.includes('secret')) {
        res.sendFile(path.join(__dirname, '/landing.html'));
    } else {
        res.sendFile(path.join(__dirname, '/error.html'));
    }
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});