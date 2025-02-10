export function startProgressTracking() {
    const progressBarContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    progressBarContainer.style.display = "block";
    progressBar.style.width = "0%";
    progressText.textContent = "0/0";

    console.log("📡 Connecting to progress updates...");

    let eventSource = new EventSource("/progress");

    eventSource.onopen = () => {
        console.log("✅ Connected to progress updates.");
    };

    eventSource.onmessage = (event) => {
        try {
            const progressData = JSON.parse(event.data);
            const completedNFTs = progressData.completedNFTs;
            const totalNFTs = progressData.totalNFTs;

            if (totalNFTs > 0) {
                const progressPercentage = (completedNFTs / totalNFTs) * 100;
                progressBar.style.width = `${progressPercentage}%`;
                progressText.textContent = `${completedNFTs}/${totalNFTs}`;
                console.log(`📊 Live Progress: ${completedNFTs}/${totalNFTs}`);
            }

            if (completedNFTs >= totalNFTs) {
                console.log("✅ NFTs Generation Complete!");
                eventSource.close();
            }
        } catch (error) {
            console.error("❌ Error processing progress update:", error);
        }
    };

    eventSource.onerror = (err) => {
        console.error("❌ SSE connection error:", err);
        eventSource.close();
        setTimeout(() => {
            console.log("🔄 Reconnecting to progress updates...");
            startProgressTracking(); // Attempt to reconnect
        }, 3000);
    };
}
