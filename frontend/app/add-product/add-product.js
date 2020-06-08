window.addEventListener("load", (ev) => {
    let butt = document.getElementById("submit");
    butt.addEventListener("click", (event) => {
        fetchData();
    });
});

function fetchData() {

    let ingrValues = document.querySelector("#ingredients").value;
    let ingredients = ingrValues.split(", ");

    let restValues = document.querySelector("#restaurants").value;
    let restaurants = restValues.split(", ");
    
    let product = {
        name: document.querySelector("#name").value,
        photoPath: document.querySelector("#photoPath").value,
        description: document.querySelector("#description").value,
        category: document.querySelector("#category").value,
        specific: document.querySelector("#specific").value,
        price: document.querySelector("#photoPath").value,
        restrictions: document.querySelector("#restrictions").value,
        restaurants: restaurants,
        ingredients: ingredients
    };
    console.log(product);
    fetch("http://localhost:3000/addProduct", {
        method: "POST",
        body: JSON.stringify(product),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.statusCode === 200) {
            } else window.alert("Could not add");
        })
        .catch((err) => {
            console.log(err);
        });
}

function logout() {
    localStorage.clear();
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
