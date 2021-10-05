var express = require("express");
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var cookieParser = require('cookie-parser');

const path = require('path');

const fs = require('fs');

var server = express();
server.use(express.json())
server.use(cookieParser());
server.use(express.static('website'))

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

server.get('/test',(req,res)=>{
    res.render('test',{title:'very cool',welcome_data: 'Welcommen'})
})

server.get('/loop_json', (req, res) => {

    // Example: read from file. Might as well be read from database.
    let users = fs.readFileSync(path.join(__dirname, '/students.json'));

    users = JSON.parse(users);

    res.render('loop_json', { title: 'loop dat', header: 'Wilbecommen', users: users })
})

server.get('/ssr', function (req, res) {
    res.render('ssr', { name: 'William' })
})

server.listen(1337, () => {
    console.log("Server running on port 1337");
});