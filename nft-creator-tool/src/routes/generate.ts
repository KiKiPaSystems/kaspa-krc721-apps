import express from "express";
import path from "path";
import fs from "fs-extra";
const archiver = require("archiver");
import { isValidCID, isValidCollectionName, ensureDir } from "../utils/fileUtils";
import { generateMetadata } from "../utils/metadata";
import { mergeImages } from "../utils/imageProcessor";
import { TEMP_DIR, OUTPUT_DIR, log } from "../config";

const router = express.Router();

// **Global progress tracking**
export let completedNFTs = 0; 
export let totalNFTs = 0; 

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

router.post("/generate", async (req, res) => {
    let { cid, collectionName, description, rules } = req.body;

    if (!isValidCID(cid)) return res.status(400).send("Invalid CID format");

    // ✅ Normalize collection name to lowercase
    collectionName = collectionName.toLowerCase();

    if (!isValidCollectionName(collectionName)) {
        return res.status(400).send("Invalid collection name");
    }

    // ✅ Ensure rules are provided
    if (!rules || typeof rules !== "object") {
        return res.status(400).send("Invalid rules format");
    }

    const collectionOutputDir = path.join(OUTPUT_DIR, collectionName);
    const metadataOutputDir = path.join(OUTPUT_DIR, `${collectionName}-metadata`);
    const imagesZipPath = path.join(OUTPUT_DIR, `${collectionName}.zip`);
    const metadataZipPath = path.join(OUTPUT_DIR, `${collectionName}-metadata.zip`);

    ensureDir(collectionOutputDir);
    ensureDir(metadataOutputDir);

    log("INFO", `Generating NFTs for collection: ${collectionName} (saved in ${collectionOutputDir})`);

    // **Track rarity counts**
    let rarityCount: Record<string, number> = {};
    rules.rarity.forEach((rule: any) => {
        Object.keys(rule).forEach(trait => {
            if (trait !== "rarityValue") {
                rarityCount[rule[trait]] = 0;
            }
        });
    });

    // **Load legendary images**
    const legendaryImages: string[] = [];
    const legendaryPath = path.join(TEMP_DIR, "legendary");

    if (fs.existsSync(legendaryPath)) {
        legendaryImages.push(...fs.readdirSync(legendaryPath)
            .filter(file => file.toLowerCase().endsWith(".png"))
            .map(file => path.join(legendaryPath, file))
        );
    }

    log("INFO", `Loaded legendary images: ${legendaryImages.length}`);

    // **Get all trait options per layer**
    const traitOptions: Record<string, string[]> = {};
    rules.layerOrder.forEach(trait => {
        const folderPath = path.join(TEMP_DIR, trait);
        if (!fs.existsSync(folderPath) || trait.startsWith("__MACOSX")) return;

        traitOptions[trait] = fs.readdirSync(folderPath)
            .filter(file => file.toLowerCase().endsWith(".png"))
            .map(file => path.join(folderPath, file));

        if (rules.NoneOptions.includes(trait)) {
            traitOptions[trait].push("None");
        }
    });

    // **Generate all possible trait combinations**
    let allCombinations = [[]] as string[][];
    for (const trait of rules.layerOrder) {
        const newCombinations: string[][] = [];
        for (const combination of allCombinations) {
            for (const traitFile of traitOptions[trait]) {
                newCombinations.push([...combination, traitFile]);
            }
        }
        allCombinations = newCombinations;
    }

    log("INFO", `Total raw combinations before filtering: ${allCombinations.length}`);

    // **Filter out invalid combinations**
    let validCombinations = allCombinations.filter(combination => {
        let traitsObj = Object.fromEntries(rules.layerOrder.map((trait, idx) => [trait.toLowerCase(), path.basename(combination[idx])]));

        return !rules.avoidCombinations.some(avoidCombo =>
            Object.entries(avoidCombo).every(([key, value]) => traitsObj[key] === value)
        );
    });

    log("INFO", `Total combinations after applying avoid rules: ${validCombinations.length}`);

    // **Apply rarity filtering**
    let finalCombinations: string[][] = [];
    for (const combination of validCombinations) {
        let traitsObj = Object.fromEntries(rules.layerOrder.map((trait, idx) => [trait.toLowerCase(), path.basename(combination[idx])]));

        let passesRarity = true;
        for (const rule of rules.rarity) {
            const traitType = Object.keys(rule).find(k => k !== "rarityValue");
            if (traitType && rarityCount[traitsObj[traitType]] >= rule.rarityValue) {
                passesRarity = false;
                break;
            }
        }

        if (passesRarity) {
            finalCombinations.push(combination);
            for (const rule of rules.rarity) {
                const traitType = Object.keys(rule).find(k => k !== "rarityValue");
                if (traitType) {
                    rarityCount[traitsObj[traitType]]++;
                }
            }
        }
    }

    log("INFO", `Total combinations after applying rarity rules: ${finalCombinations.length}`);

    // **Insert legendary NFTs**
    for (let i = 0; i < rules.legendaryChance * legendaryImages.length; i++) {
        const legendaryImage = legendaryImages[i % legendaryImages.length];
        finalCombinations.push([legendaryImage]); // **Standalone legendary NFT**
        log("INFO", `✨ Added standalone legendary NFT: ${path.basename(legendaryImage)}`);
    }

    // Shuffle valid combinations
    //finalCombinations.sort(() => Math.random() - 0.5);
    shuffleArray(finalCombinations);

    totalNFTs = finalCombinations.length;
    completedNFTs = 0;

    log("INFO", `Final total NFTs to be generated (including legendary): ${totalNFTs}`);

    // **Generate NFTs**
    let generatedNFTs = 0;

// Process each NFT asynchronously
for (let combination of finalCombinations) {
    if (generatedNFTs >= totalNFTs) break;

    let formattedTraits: { traitType: string, value: string }[];

    if (combination.length === 1 && legendaryImages.includes(combination[0])) {
        formattedTraits = [{ traitType: "legendary", value: path.basename(combination[0]) }];
    } else {
        formattedTraits = rules.layerOrder.map((trait, idx) => ({
            traitType: trait.toLowerCase(),
            value: path.basename(combination[idx]),
        })).filter(t => t.value !== "None"); // ✅ Filter out "None" layers
    }

    const imageID = `${generatedNFTs + 1}.jpg`;
    const outputPath = path.join(collectionOutputDir, imageID);
    
    // ✅ Process NFT asynchronously
    await Promise.all([
        mergeImages(combination.filter(t => t !== "None"), outputPath),
        generateMetadata(collectionName, description, cid, imageID, formattedTraits, metadataOutputDir)
    ]);

    generatedNFTs++;
    completedNFTs++;

    // ✅ Ensure progress updates are sent immediately
    await new Promise(resolve => setTimeout(resolve, 50)); // Small delay for responsiveness
}

    // ✅ Create ZIP files after NFTs are generated
    await createZip(collectionOutputDir, imagesZipPath);
    await createZip(metadataOutputDir, metadataZipPath);

    log("INFO", `ZIP files created: ${imagesZipPath} & ${metadataZipPath}`);

    res.json({ message: "NFT generation completed", totalNFTs: generatedNFTs, collectionName });
});

// ✅ Function to create ZIP files
async function createZip(sourceDir: string, zipFilePath: string) {
    return new Promise<void>((resolve, reject) => {
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver("zip", { zlib: { level: 9 } });
        output.on("close", () => {
            log("INFO", `ZIP file created: ${zipFilePath}`);
            resolve();
        });

        archive.on("error", (err) => reject(err));

        archive.pipe(output);
        archive.directory(sourceDir, false);
        archive.finalize();
    });
}

export default router;
