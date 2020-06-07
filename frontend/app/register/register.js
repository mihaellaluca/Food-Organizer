window.addEventListener("load", (event) => {
    let butt = document.getElementById("submitRegister");
    butt.addEventListener("click", (event) => {
        event.preventDefault();
        registerUser();
    });
});

function registerUser() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    if (email && password && firstName && lastName) {
        const credentials = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        };
        fetch("http://localhost:3000/register", {
            method: "POST",
            body: JSON.stringify(credentials),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.statusCode === 200) {
                    window.alert("Welcome to our community. Please sign in!");
                } else window.alert("No account was created.");
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        window.alert("Please provide the information needed!");
    }
}
