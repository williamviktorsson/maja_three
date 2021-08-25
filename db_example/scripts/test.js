var xhr = new XMLHttpRequest();
xhr.open("POST", " http://localhost:3000/authenticate", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    username: "xyz"
}));