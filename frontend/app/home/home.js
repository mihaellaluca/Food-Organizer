function saveCategory(category) {
    if (!window.localStorage) {
        alert("This browser doesn't support local storage.");
        return;
    }
    localStorage.setItem("category", category);
}
