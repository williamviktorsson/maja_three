
function handleLogin(event) {
    event.preventDefault();

    let data = new FormData(event.target)

    let username = data.get("username")
    let password = data.get("password")

    fetch('http://localhost:1337/authentication', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then(response => response.json().then((data) => {

        if(!(data.authenticated==true)){
            document.getElementById("error").innerHTML="Authentication Failed"
        } else {
            window.location.assign("landing")
        }

    }).catch(error => {
        console.log(error)
    }))

}


function handleDelete(event) {
    event.preventDefault();
    
    console.log("ya yeet")

    fetch('http://localhost:1337/authentication', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json().then((data) => {

        if (!(data.deleted == true)) {
            document.getElementById("error").innerHTML = "Deletion Failed"
        } else {
            document.getElementById("error").innerHTML = "Delete Success"
        }

    }).catch(error => {
        console.log(error)
    }))

}


function joinChat() {

    this.socket = io("http://localhost:1337", { autoConnect: false });


    document.getElementById("inputForm").addEventListener("submit", (event)=>{
        event.preventDefault();

        let data = new FormData(event.target)

        let message = data.get("chat")

        if (message != "") {
            this.socket.emit("message", message);
            document.getElementById("inputForm").reset()
        }
    })

    this.socket.connect();

    this.socket.on("connect", async () => {
        this.socket.emit("join", "mongodb");
    });

    this.socket.on("joined", async (gameId) => {
        let chat = document.getElementById("chatbox")
        let li = document.createElement("li")
        li.innerHTML = "Welcome to " + gameId;
        chat.prepend(li)
  
    });

    this.socket.on("message", (message) => {
        let chat = document.getElementById("chatbox")
        let li = document.createElement("li")
        li.innerHTML=message;
        chat.appendChild(li)
    });
}

