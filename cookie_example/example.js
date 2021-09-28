var ObjectId = require('mongodb').ObjectId;
var cookieParser = require('cookie-parser');
server.use(cookieParser());

// in delete
let token = req.cookies['token']
let o_id = new ObjectId(token);

db.collection("authentication").deleteOne({ '_id': o_id })

// in authenticate

return res.cookie('token', result._id.toString()).send(JSON.stringify(json))

// in get
if(req.headers.cookie.includes('token=')){
    
}
