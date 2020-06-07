window.addEventListener("load", (event) => {
    isAdmin();
    bringData();
});

function bringData() {
    var category = localStorage.getItem("category");
    let token = localStorage.getItem("token");
    console.log("category:", category);
    console.log("token", token);

    if (!token) {
        console.log("Login first!");
    } else {
        let response = fetch(
            `http://localhost:3000/?products/category=${category}`
        )
            .then((res) => res.json())
            .then((datas) => {
                let products = datas.data;
                if (products.length) {
                    createProductsElements(products);
                } else {
                    createNoProductElements();
                }
            })
            .catch((err) => console.log(err));
    }
}

function createProductsElements(products) {
    for (let i = 0; i < products.length; i++) {
        var container = document.getElementById("recipes-container");
        var productDiv = document.createElement("div");
        productDiv.setAttribute("class", "recipe");
        var productImg = document.createElement("img");
        productImg.setAttribute("src", products[i].photoPath);
        var productPar = document.createElement("p");
        productPar.setAttribute("id", "description");
        productPar.innerHTML = products[i].description;
        var productA = document.createElement("a");
        productA.setAttribute("class", "title");
        productA.setAttribute("id", products[i]._id);
        productA.setAttribute("href", "./../product-page/product-page.html");
        productA.innerHTML = products[i].name;

        productDiv.appendChild(productImg);
        productDiv.appendChild(productA);
        productDiv.appendChild(productPar);
        container.appendChild(productDiv);

        productA.addEventListener("click", (event) => {
            localStorage.setItem("productId", products[i]._id);
        });
    }
}

function createNoProductElements() {
    var container = document.getElementById("recipes-container");
    var productDiv = document.createElement("div");
    productDiv.setAttribute("class", "recipe");
    var productPar = document.createElement("p");
    productPar.setAttribute("id", "description");
    productPar.innerHTML =
        "There are no products of this category. Come back later and you may find some tasty food!";
    var productImg = document.createElement("img");
    productImg.setAttribute("src", "./../../assets/funny-ninja-on-diet.jpg");
    productImg.setAttribute("class", "img-none");

    productDiv.appendChild(productPar);
    productDiv.appendChild(productImg);
    container.appendChild(productDiv);
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
