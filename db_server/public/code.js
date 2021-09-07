function handleLogin(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const username = data.get('username');
    const password = data.get('password');

    let json = {
        username,
        password
    }

    fetch('http://localhost:3000/authentication', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    }).then(response => response.json())
        .then(data => {
            if (data.authenticated) {
                window.location.assign("http://localhost:3000/landing");

            } else {
                document.getElementById("error").innerHTML = "Authentication Failed";
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById("error").innerHTML = error;
        });

}