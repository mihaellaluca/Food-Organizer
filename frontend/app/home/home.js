window.addEventListener("load", (event) => {
    isAdmin();
    canSeeMostWanted();
    canAddProduct();
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
function canSeeMostWanted() {
    if (localStorage.getItem("admin") === "true") {
        let h2 = document.getElementById("h2");
        let a = document.createElement("a");
        a.setAttribute("href", "./../most-wanted/most-wanted.html");
        a.setAttribute("id", "most-wanted");
        a.innerText = "Check the most popular food";
        h2.parentNode.insertBefore(a, h2.nextSibling);
    }
}
function canAddProduct() {
    if (localStorage.getItem("admin") === "true") {
        let h2 = document.getElementById("most-wanted");
        let a = document.createElement("a");
        a.setAttribute("href", "./../add-product/add-product.html");
        a.setAttribute("id", "add-product");
        a.innerText = "Add a new product";
        let br = document.createElement("br");
        h2.parentNode.insertBefore(br, h2.nextSibling);
        br.parentNode.insertBefore(a, br.nextSibling);
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

function logout() {
    localStorage.clear();
}
