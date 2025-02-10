import fs from "fs";
import path from "path";

// Validate CID format (59 lowercase alphanumeric)
export const isValidCID = (cid: string): boolean => /^[a-z0-9]{59}$/.test(cid);

// Validate collection name format (min 4 chars, lowercase letters & numbers)
export const isValidCollectionName = (name: string): boolean => /^[a-z0-9]{4,}$/.test(name);

// Ensure folder exists
export const ensureDir = (dir: string) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// Read directory contents
export const listFiles = (dir: string, extension: string): string[] =>
    fs.existsSync(dir) ? fs.readdirSync(dir).filter(file => file.endsWith(extension)) : [];
