import "./upload.js";
import "./validation.js";
import { startProgressTracking } from "./progress.js";

document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const viewCollectionBtn = document.getElementById("viewCollectionBtn");

    generateBtn.addEventListener("click", async () => {
        console.log("📊 generateBtn clicked");

        let collectionName = document.getElementById("collectionNameInput").value.trim().toLowerCase();
        const description = document.getElementById("descriptionInput").value.trim();
        const cidInput = document.getElementById("cidInput").value.trim();
        const rulesTextarea = document.getElementById("rulesTextarea").value.trim();

        if (!collectionName || !description || !cidInput || !rulesTextarea) {
            console.error("❌ Missing required fields or rules JSON is empty.");
            return;
        }

        let rules;
        try {
            rules = JSON.parse(rulesTextarea);
            console.log("✅ Rules JSON Loaded", rules);
        } catch (error) {
            console.error("❌ Invalid JSON format. Please check and try again.");
            return;
        }

        console.log("📤 Sending generation request...");
        console.log("CID:", cidInput);
        console.log("Collection Name:", collectionName);
        console.log("Description:", description);
        console.log("Rules:", rules);

        // ✅ Start progress tracking **before** sending the request
        startProgressTracking();

        try {
            const response = await fetch("/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cid: cidInput,
                    collectionName,
                    description,
                    rules,
                }),
            });

            if (!response.ok) {
                throw new Error(`❌ Failed to generate NFTs: ${response.statusText}`);
            }

            console.log("✅ NFT Generation Started");

            // Show view collection and download buttons
            viewCollectionBtn.style.display = "block";
            viewCollectionBtn.onclick = () => {
                window.location.href = `/output/${collectionName}`;
            };

            // Show download buttons after the NFT collection is created
            showDownloadButtons();

        } catch (error) {
            console.error(error);
        }
    });
});

document.getElementById("downloadImagesBtn").addEventListener("click", async function() {
    let collectionName = document.getElementById("collectionNameInput").value.trim().toLowerCase(); // Convert to lowercase
    if (!collectionName) {
        alert("Please enter a valid collection name.");
        return;
    }
    const imagesZipPath = `output/${collectionName}.zip`;
    window.location.href = imagesZipPath;
});

document.getElementById("downloadMetadataBtn").addEventListener("click", async function() {
    let collectionName = document.getElementById("collectionNameInput").value.trim().toLowerCase(); // Convert to lowercase
    if (!collectionName) {
        alert("Please enter a valid collection name.");
        return;
    }
    const metadataZipPath = `output/${collectionName}-metadata.zip`;
    window.location.href = metadataZipPath;
});


function showDownloadButtons() {
    document.getElementById("downloadImagesBtn").style.display = "block";
    document.getElementById("downloadMetadataBtn").style.display = "block";
}
