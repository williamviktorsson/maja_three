
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