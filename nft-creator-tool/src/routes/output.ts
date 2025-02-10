import express from "express";
import path from "path";
import fs from "fs-extra";
import { OUTPUT_DIR } from "../config";

const router = express.Router();

// ✅ Serve generated images
router.get("/output/:cid", async (req, res) => {
    const cid = req.params.cid;
    const cidFolder = path.join(OUTPUT_DIR, cid);

    if (!fs.existsSync(cidFolder)) {
        return res.status(404).send("❌ CID folder not found");
    }

    const files = fs.readdirSync(cidFolder).filter(file => file.endsWith(".jpg"));

    if (files.length === 0) {
        return res.status(404).send("❌ No NFTs found");
    }

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NFT Collection - ${cid}</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; }
            .grid-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; padding: 20px; }
            .grid-container img { width: 100%; height: auto; border-radius: 8px; }
        </style>
    </head>
    <body>
        <h1>NFT Collection: ${cid}</h1>
        <div class="grid-container">
            ${files.map(file => `<img src="/output/${cid}/${file}" alt="${file}">`).join("\n")}
        </div>
    </body>
    </html>`;

    res.send(html);
});

router.get("/output/:cid/:filename", (req, res) => {
    const { cid, filename } = req.params;
    const filePath = path.join(OUTPUT_DIR, cid, filename);

    console.log(`🧐 Checking file: ${filePath}`);

    if (fs.existsSync(filePath)) {
        console.log(`✅ Serving file: ${filePath}`);
        res.sendFile(filePath);
    } else {
        console.log(`❌ File not found: ${filePath}`);
        res.status(404).send("File not found");
    }
});


export default router;
