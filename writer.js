"use strict";
import fs from "node:fs/promises";

export async function createFile(filePath, content) {
    try {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`Successfully created: ${filePath}`);
    } catch (error) {
        console.error('Failed to create file:', error.message);
    }
}

export async function readFile(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        console.log(`Successfully read: ${filePath}`);
        return content;
    } catch (error) {
        console.error('Failed to read file:', error.message);
    }
}
