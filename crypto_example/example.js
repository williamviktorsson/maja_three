
let crypto = require('crypto');

const password = "my_password"; 

// Creating a unique salt for a particular user
const salt = crypto.randomBytes(16).toString('hex'); 
// Should be saved in the database along with the password

// Hash the salt and password with 1000 iterations, 64 length and sha512 digest 
const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

let json = {
    salt,
    hash
}

// save json to DB for user

const re_entered_password = "my_password";

// To verify the same - salt (stored in DB) with same other parameters used while creating hash (1000 iterations, 64 length and sha512 digest)
const correctHash = crypto.pbkdf2Sync(re_entered_password, json.salt, 1000, 64, 'sha512').toString('hex');

// check if hash (stored in DB) and newly generated hash (newHash) are the same
if(hash == correctHash){
    console.log("First password entered was correct")
}

const re_entered_password_wrong = "your_password";
const wrongHash = crypto.pbkdf2Sync(re_entered_password_wrong, json.salt, 1000, 64, 'sha512').toString('hex');
if(hash != wrongHash){
    console.log("Second password entered was incorrect")
}