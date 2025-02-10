const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");
const traitsList = document.getElementById("traitsList");
const traitsTitle = document.getElementById("traitsTitle");
const generateBtn = document.getElementById("generateBtn"); // ✅ Reference the button

dropzone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/upload", { method: "POST", body: formData });
        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();

        // Show the title
        traitsTitle.style.display = "block";
        traitsList.innerHTML = "";

        // Display uploaded traits
        data.traits.forEach(trait => {
            const span = document.createElement("span");
            span.className = "trait-box";
            span.textContent = trait;
            traitsList.appendChild(span);
        });

        // ✅ Show the "Generate NFTs" button
        generateBtn.style.display = "block";

    } catch (error) {
        console.error("❌ Error uploading file:", error);
    }
});
