import path from "path";
import fs from "fs-extra";

// Enable debugging for verbose logs
export const DEBUG = process.env.DEBUG === "true";

export const PORT = 8080;
export const TEMP_DIR = path.join(__dirname, "../temp");
export const OUTPUT_DIR = path.join(__dirname, "../output");

fs.ensureDirSync(TEMP_DIR);
fs.ensureDirSync(OUTPUT_DIR);

// Logger function
export const log = (level: "INFO" | "DEBUG", message: string) => {
    if (level === "INFO" || (level === "DEBUG" && DEBUG)) {
        console.log(`[${level}] ${message}`);
    }
};
