import express from "express";
import { completedNFTs, totalNFTs } from "./generate";

const router = express.Router();

router.get("/progress", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Send the first progress update immediately
    res.write(`data: ${JSON.stringify({ completedNFTs, totalNFTs })}\n\n`);

    const interval = setInterval(() => {
        res.write(`data: ${JSON.stringify({ completedNFTs, totalNFTs })}\n\n`);

        if (completedNFTs >= totalNFTs) {
            clearInterval(interval);
            res.end(); // ✅ Close connection properly when done
        }
    }, 1000); // ✅ Send updates every second

    req.on("close", () => {
        clearInterval(interval);
    });
});

export default router;
