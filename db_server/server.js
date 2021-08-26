var express = require("express");
const MongoClient = require('mongodb').MongoClient;
var app = express();

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.post('/authenticate', async (req, res) => {
    try {
        MongoClient.connect("mongodb://127.0.0.1:27017/", async (err, client) => {
            if (err) throw err;
            db = client.db("local");
            username = req.body.username;
            password = req.body.password;
            result = await db.collection("authentication").findOne({ 'username': username, 'password': password })

            return res.send(JSON.stringify({authenticated: result !=null, username: username}));
        });
    } catch (error) {
        return res.send(error);
    }
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});