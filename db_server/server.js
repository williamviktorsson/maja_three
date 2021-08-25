var express = require("express");
const MongoClient = require('mongodb').MongoClient;
var app = express();

app.use(express.json())

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


app.post('/authenticate', async (req, res) => {
    console.log(req.body.username);
    try {
        MongoClient.connect("mongodb://127.0.0.1:27017/", (err, db) => {
            if (err) throw err;
            db = client.db("local");
            console.log(db);
            username = req.body.username;
            result = db.collection("authentication").findOne({ username })
            return res.send(result);
        });
    } catch (error) {
        return res.send(error);
    }
})