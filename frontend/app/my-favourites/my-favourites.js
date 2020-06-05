window.addEventListener("load", (event) => {
    bringData();
});

function bringData() {
    let response = fetch(`http://localhost:3000/?userFavourites/id=5eb6dfeb145d8b6d6ca7e553`)
    .then((res) => res.json())
    .then((datas) => {
        let products = datas.data[0].favourites;
        if (products.length) {
            createProductsElements(products);
        } else {
            createNoProductElements();
        }
    })
    .catch((err) => console.log(err));
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
        "You have no favourite food! Check out some recipes and add some to your favouries!";
    var productImg = document.createElement("img");
    productImg.setAttribute("src", "./../../assets/funny-ninja-on-diet.jpg");
    productImg.setAttribute("class", "img-none");

    productDiv.appendChild(productPar);
    productDiv.appendChild(productImg);
    container.appendChild(productDiv);
}
