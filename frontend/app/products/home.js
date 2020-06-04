window.addEventListener("load", (event) => {
    bringData();
});

function bringData() {
    var category = localStorage.getItem("category");
    console.log("category:", category);
    let response = fetch(`http://localhost:3000/?products/category=${category}`)
        .then((res) => res.json())
        .then((datas) => {
            let products = datas.data;
            if (products.length) {
                for (let i = 0; i < products.length; i++) {
                    var container = document.getElementById(
                        "recipes-container"
                    );
                    var productDiv = document.createElement("div");
                    productDiv.setAttribute("class", "recipe");
                    var productImg = document.createElement("img");
                    productImg.setAttribute("src", products[i].photoPath);
                    var productPar = document.createElement("p");
                    productPar.setAttribute("id", "description");
                    productPar.innerHTML = products[i].description;
                    var productA = document.createElement("a");
                    productA.setAttribute("id", "title");
                    productA.innerHTML = products[i].name;

                    productDiv.appendChild(productImg);
                    productDiv.appendChild(productA);
                    productDiv.appendChild(productPar);
                    container.appendChild(productDiv);
                }
            } else {
                var container = document.getElementById("recipes-container");
                var productDiv = document.createElement("div");
                productDiv.setAttribute("class", "recipe");
                var productPar = document.createElement("p");
                productPar.setAttribute("id", "description");
                productPar.innerHTML = "There are no products of this category. Come back later and you may find some tasty food!"
                var productImg = document.createElement("img");
                productImg.setAttribute("src", "./../../assets/funny-ninja-on-diet.jpg");
                productImg.setAttribute("class","img-none");

                productDiv.appendChild(productPar);
                productDiv.appendChild(productImg);
                container.appendChild(productDiv);
            }
        })
        .catch((err) => console.log(err));
}

