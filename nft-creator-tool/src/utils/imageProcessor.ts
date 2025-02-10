import sharp from "sharp";
import fs from "fs-extra";

export const mergeImages = async (layers: string[], outputPath: string) => {
    if (layers.length === 0) throw new Error("No layers provided for merging");

    //console.log("🔄 Debug: Merging layers:", layers);

    // ✅ Ensure all input files exist
    layers.forEach(layer => {
        if (!fs.existsSync(layer)) {
            throw new Error(`❌ Missing layer: ${layer}`);
        }
    });

    let base = sharp(layers[0]).ensureAlpha();

    const composites = layers.slice(1).map(layer => ({
        input: layer,
        blend: "over",
    }));

    try {
        await base.composite(composites)
            .toFormat("png")  // ✅ Ensure output is PNG
            .toFile(outputPath);

        console.log(`✅ Image saved: ${outputPath}`);
    } catch (err) {
        console.error("❌ Error processing image:", err);
        throw new Error("Image processing failed.");
    }
};
