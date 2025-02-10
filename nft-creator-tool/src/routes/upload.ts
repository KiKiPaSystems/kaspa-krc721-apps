import fs from "fs-extra";
import path from "path";
import express from "express";
import multer from "multer";
import AdmZip from "adm-zip";
import { TEMP_DIR } from "../config";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded");

    try {
        const zipPath = req.file.path;
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(TEMP_DIR, true);
        fs.unlinkSync(zipPath); // ✅ Remove uploaded ZIP file

        // ✅ Exclude __MACOSX and hidden files
        const traits = fs.readdirSync(TEMP_DIR)
            .filter(dir => !dir.startsWith('.') && dir !== "__MACOSX");

        res.json({ message: "Traits detected", traits });
    } catch (error) {
        console.error("❌ Error processing ZIP file:", error);
        res.status(500).send("Error processing ZIP file");
    }
});

export default router;
