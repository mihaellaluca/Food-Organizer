window.addEventListener("load", (event) => {
    isAdmin();
});

function saveCategory(category) {
    if (!window.localStorage) {
        alert("This browser doesn't support local storage.");
        return;
    }
    localStorage.setItem("category", category);
}
function isAdmin() {
    let admin = localStorage.getItem("admin");
    if (admin === "true") {
        let statistics = document.createElement("a");
        statistics.setAttribute("href", "./../statistics/home.html");
        statistics.innerText = "Statistics";
        let myCart = document.getElementById("my-cart");
        myCart.parentNode.insertBefore(statistics, myCart.nextSibling);
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

function logout(){
    localStorage.clear();
}
