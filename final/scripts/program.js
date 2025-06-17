function getProgramSelection() {
    const selectElement = document.getElementById("programs");
    const selectedValue = selectElement.value;

    if (selectedValue === "add-program") {
        window.location.href = "addprograms.html";
    }
}
