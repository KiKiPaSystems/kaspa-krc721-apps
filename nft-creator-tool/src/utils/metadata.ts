import fs from "fs/promises";
import path from "path";

// Format PNG file names to human-readable format
export const formatTraitName = (filename: string): string => {
    return filename
        .replace(/\.(png|PNG)$/, "") // Remove both .PNG and .png extensions
        .replace(/-/g, " ") // Replace hyphens with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize each word
};

// Capitalize the first letter of trait types
export const formatTraitType = (traitType: string): string => {
    return traitType.charAt(0).toUpperCase() + traitType.slice(1);
};

// Generate metadata JSON
export const generateMetadata = async (
    collectionName: string,
    description: string,
    cid: string,
    imageID: string,
    traits: { traitType: string; value: string }[],
    metadataOutputDir: string
) => {
    // ✅ Correctly format trait type and value
    const formattedTraits = traits.map(trait => ({
        traitType: formatTraitType(trait.traitType),
        value: formatTraitName(trait.value),
    }));

    const metadata = {
        name: `${collectionName} #${imageID.replace(".jpg", "")}`,
        description,
        image: `ipfs://${cid}/${imageID}`,
        attributes: formattedTraits,
    };

    try {
        await fs.writeFile(
            path.join(metadataOutputDir, `${imageID.replace(".jpg", "")}`),
            JSON.stringify(metadata, null, 2)
        );
        console.log(`✅ JSON saved: ${metadataOutputDir}/${imageID.replace(".jpg", "")}`)
    } catch (error) {
        console.error(`❌ Error saving metadata for ${imageID}:`, error);
    }
};
