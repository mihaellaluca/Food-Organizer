window.addEventListener("load", (event) => {
    isAdmin();
    displayIfHasGroup();
});

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

function displayIfHasGroup() {
    if (localStorage.getItem("group")) {
        fetch(
            `http://localhost:3000/?group/id=${localStorage.getItem("group")}`
        )
            .then((res) => res.json())
            .then((data) => {
                let container = document.getElementById("container");
                let h2 = document.createElement("h2");
                let text = document.createTextNode(`Welcome to ${data.name}`);
                h2.appendChild(text);
                container.appendChild(h2);
                for (let i = 0; i < data.productsId.length; i++) {
                    let product = document.createElement("a");
                    product.setAttribute(
                        "href",
                        "./../product-page/product-page.html"
                    );
                    product.setAttribute("id", data.productsId[i]._id);
                    product.innerText = data.productsId[i].name;
                    product.addEventListener("click", (event) => {
                        localStorage.setItem("productId", product.getAttribute("id"));
                    });
                    let img = document.createElement("img");
                    img.setAttribute("src", data.productsId[i].photoPath);
                    container.appendChild(product);
                    container.appendChild(img);
                }
            });
    } else {
        let container = document.getElementById("container");
        let h3 = document.createElement("h4");
        let text = document.createTextNode("You are not a member of a group.");
        h3.appendChild(text);
        container.appendChild(h3);
    }
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

