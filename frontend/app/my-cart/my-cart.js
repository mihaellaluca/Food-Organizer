var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    };
}

// Create a new item in list when clicking the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === "") {
        alert("Write an ingredient to add it.");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        };
    }
}
function saveList() {
    var ul = document.getElementById("list-container");
    var items = ul.getElementsByTagName("li");
    if (items.length === 0) {
        window.alert("Add some products first!");
        return;
    }
    var cart = [];
    for (var i = 0; i < items.length; i++) {
        console.log(items[i].innerText.split("\n")[0]);
        cart.push(items[i].innerText.split("\n")[0]);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.alert("You created your list!");
}

window.addEventListener("load", (event) => {
    isAdmin();
    if (localStorage.getItem("cart")) {
        var existentList = document.getElementById("existent-list");
        var h = document.createElement("h2");
        var text = document.createTextNode("My current list:");
        h.appendChild(text);
        existentList.appendChild(h);
        var ul = document.createElement("ul");
        existentList.appendChild(ul);
        var elements = JSON.parse(localStorage.getItem("cart"));
        for (var i = 0; i < elements.length; i++) {
            console.log(elements[i]);
            let li = document.createElement("li");
            li.innerHTML = elements[i];
            ul.appendChild(li);
        }

        var input = document.createElement("input");
        input.setAttribute("id", "anotherInput");
        input.setAttribute("placeholder", "Something else?...");
        var button = document.createElement("button");
        button.setAttribute("id", "addIngredient");
        button.innerHTML = "add";
        button.addEventListener("click", (event) => {
            addToCurrentList(input.value);
        });
        existentList.appendChild(input);
        existentList.appendChild(button);

        var button = document.createElement("button");
        button.innerHTML = "Clear list";
        button.setAttribute("id", "clear-btn");
        existentList.appendChild(button);
        button.addEventListener("click", (event) => {
            localStorage.removeItem("cart");
            window.alert("Current list deleted!");
        });
    }
});

function addToCurrentList(newItem) {
    var items = JSON.parse(localStorage.getItem("cart"));
    items[items.length] = newItem;
    localStorage.setItem("cart", JSON.stringify(items));
    window.alert("New product added in your list!");
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
