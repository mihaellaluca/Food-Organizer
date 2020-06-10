window.addEventListener("load", (event) => {
    let input = document.getElementById("password");
    let a = document.createElement("a");
    a.setAttribute("id","link");
    a.setAttribute("href","./../home/home.html");
    a.innerText = "Login";
    input.parentNode.insertBefore(a, password.nextSibling);
    a.addEventListener("click", (event) => {
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
        fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.statusCode === 200) {
                    let userId = data.data._id;
                    let token = data.token;
                    let admin = data.data.admin;
                    localStorage.setItem("userId", userId);
                    localStorage.setItem("token", token);
                    localStorage.setItem("admin", JSON.stringify(admin));
                    checkUserInGroup();
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
    if (token) {
        // login succeeded
        document
            .getElementById("home")
            .setAttribute("href", "./../home/home.html");
    } else {
        document
            .getElementById("home")
            .setAttribute("href", "./../forbidden/forbidden.html");
    }
}

function checkUserInGroup() {
    let userId = localStorage.getItem("userId");
    fetch(`http://localhost:3000/?checkUserInAGroup/id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.statusCode === 200) {
                localStorage.setItem("group", data.data);
            }
        });
}
