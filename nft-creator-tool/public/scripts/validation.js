export function validateInputs() {
    const collectionName = document.getElementById("collectionNameInput").value.trim();
    const description = document.getElementById("descriptionInput").value.trim();
    const cidInput = document.getElementById("cidInput").value.trim();
    const collectionNameError = document.getElementById("collectionNameError");
    const cidError = document.getElementById("cidError");

    let valid = true;

    if (!/^[a-z0-9]{4,}$/.test(collectionName)) {
        collectionNameError.style.display = "inline";
        valid = false;
    } else {
        collectionNameError.style.display = "none";
    }

    if (!/^[a-z0-9]{59}$/.test(cidInput)) {
        cidError.style.display = "inline";
        valid = false;
    } else {
        cidError.style.display = "none";
    }

    return valid ? { collectionName, description, cidInput } : null;
}
