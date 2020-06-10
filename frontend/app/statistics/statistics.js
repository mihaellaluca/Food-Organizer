window.addEventListener("load", (event) => {
    let admin = localStorage.getItem("admin");
    if (admin === "true") {
        isAdmin();
        fetchStatistics();
    }
});

function isAdmin() {
    let statistics = document.createElement("a");
    statistics.setAttribute("href", "./../statistics/home.html");
    statistics.innerText = "Statistics";
    let myCart = document.getElementById("my-cart");
    myCart.parentNode.insertBefore(statistics, myCart.nextSibling);
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

function logout() {
    localStorage.clear();
}

function fetchStatistics() {
    fetch("http://localhost:3000/?statistics")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let nrOfUsers = document.getElementById("nrOfUsers");
            nrOfUsers.innerHTML = data.nrOfUsers;
            let lastUsers = document.getElementById("lastUsers");
            lastUsers.innerHTML = data.nrOfUsersInLastDays;
        })
        .catch((err) => console.log(err));
}
