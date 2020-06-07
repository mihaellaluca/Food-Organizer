window.addEventListener("load", (event) => {
    isAdmin();
    fetchData();
});

function fetchData() {
    console.log("fetching product");
    var productId = localStorage.getItem("productId");
    var response = fetch(`http://localhost:3000/?products/id=${productId}`)
        .then((res) => res.json())
        .then((datas) => {
            let product = datas.data;
            console.log(product.name);
            createElements(product);
        })
        .catch((err) => console.log(err));
}

function createElements(product) {
    var topContainer = document.getElementById("product-container");
    var h = document.createElement("H2");
    var t = document.createTextNode(product.name);
    h.appendChild(t);
    var productImage = document.createElement("img");
    productImage.setAttribute("src", product.photoPath);
    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("class", "add-favourite");
    button.innerHTML = "Add to favourites";
    button.addEventListener("click", (event) => {
        addToFavourites(product); //add to user's favourites
    });

    topContainer.appendChild(h);
    topContainer.appendChild(productImage);
    topContainer.appendChild(button);

    var midContainer = document.getElementById("mid-container");
    var description = document.createElement("h3");
    var category = document.createElement("h3");
    var specific = document.createElement("h3");
    var restrictions = document.createElement("h3");
    var text = document.createTextNode("Description: \n");
    description.appendChild(text);
    text = document.createTextNode("Category: ");
    category.appendChild(text);
    text = document.createTextNode("Specific: ");
    specific.appendChild(text);
    text = document.createTextNode("Restrictions: ");
    restrictions.appendChild(text);

    var productDescription = document.createElement("p");
    productDescription.innerHTML = product.description;
    var productCategory = document.createElement("p");
    productCategory.innerHTML = product.category;
    var productSpecific = document.createElement("p");
    productSpecific.innerHTML = product.specific;
    var productRestrictions = document.createElement("p");
    productRestrictions.innerHTML = product.restrictions;

    midContainer.appendChild(description);
    midContainer.appendChild(productDescription);
    midContainer.appendChild(category);
    midContainer.appendChild(productCategory);
    midContainer.appendChild(specific);
    midContainer.appendChild(productSpecific);
    midContainer.appendChild(restrictions);
    midContainer.appendChild(productRestrictions);
    var ingredients = document.createElement("h3");
    text = document.createTextNode("List of ingredients:");
    ingredients.appendChild(text);
    midContainer.appendChild(ingredients);
    product.ingredients.forEach((ingr) => {
        let p = document.createElement("p");
        p.innerHTML = ingr;
        midContainer.appendChild(p);
    });

    var botContainer = document.getElementById("bottom-container");
    var locations = document.createElement("h3");
    text = document.createTextNode(
        "Restaurants where you can find this product:"
    );
    locations.appendChild(text);
    botContainer.appendChild(locations);
    product.restaurants.forEach((rest) => {
        let p = document.createElement("p");
        p.innerHTML = rest;
        botContainer.appendChild(p);
    });
}

function addToFavourites(product) {
    let data = {
        userId: localStorage.getItem("userId"),
        product: product,
    };

    const response = fetch("http://localhost:3000/addFavourite", {
        method: "POST",
        body: JSON.stringify(data),
    })
        .then((data) => {
            if(data.statusCode === 200)
                window.alert("Product added to your favourites!");
            else window.alert("Product already in your favourites");
        })
        .catch((err) => {
            console.log(err);
        });
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


// MAP

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 47.1573031, lng: 27.587914 },
        zoom: 15,
    });
}
