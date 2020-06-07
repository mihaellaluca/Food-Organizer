window.addEventListener("load", (event) => {
    let butt = document.getElementById("submitForm");
    butt.addEventListener("click", (event) => {
        event.preventDefault();
        loginUser();
    });
});

function loginUser() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    if (email && password) {
        let credentials = {
            email: email,
            password: password,
        };
        console.log(credentials);
        fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.statusCode === 200) {
                    console.log(data.data._id);
                    let userId = data.data._id;
                    let token = data.token;
                    let admin = data.data.admin;
                    localStorage.setItem("userId", userId);
                    localStorage.setItem("token", token);
                    localStorage.setItem("admin", JSON.stringify(admin));
                } else if (data.statusCode === 404) {
                    window.alert(JSON.stringify(data.data.msg));
                } else if (data.statusCode === 400) {
                    window.alert("Invalid data");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        window.alert("Please provide an email and a password!");
    }
}


function checkAuthorization() {
    var token = localStorage.getItem("token");
    if(token) { // login succeeded
        document.getElementById("home").setAttribute("href", "./../home/home.html");
    }
    else{
        document.getElementById("home").setAttribute("href","./../forbidden/forbidden.html");
    }
}