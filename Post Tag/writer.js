"use strict";
import fs from "node:fs/promises";
import path from "path";
import url from "url";
import {enumerate} from "./enumerator.js";
import {newTag} from "./runner.js";
import {unparse} from "./parser.js";

const SIZE = 7;
const MAX_STEPS = 1_000;
const MAX_TAGS = 100_000;

const scriptPath = path.dirname(url.fileURLToPath(import.meta.url));
const filename = `BBPT(${SIZE}).txt`;
const filePath = path.resolve(path.join(scriptPath, filename));

async function resetFile() {
    try {
        await fs.writeFile(filePath, "", 'utf8');
        console.log(`Successfully created: ${filename}`);
    } catch (error) {
        console.error('Failed to write file:', error.message);
    }
}

async function appendFile(content) {
    try {
        await fs.appendFile(filePath, content, 'utf8');
        console.log(`Successfully appended: ${filename}`);
    } catch (error) {
        console.error('Failed to append file:', error.message);
    }
}

async function newHoldoutsList() {
    await resetFile();
    let tags = [];
    let record = 0;

    for (const code of enumerate(SIZE)) {
        // Execute the tag system
        const tag = newTag(code, MAX_STEPS);
        const steps = tag.run();

        // Check if the tag system timed out
        if (steps < 0) {
            tags.push(unparse(code));
            if (tags.length >= MAX_TAGS) {
                console.log("Maximum tags count reached!");
                break;
            }
            continue;
        }

        // Check if the tag system is a champion
        if (steps > record) {
            console.log("Champion:", unparse(code), `(${steps})`);
            record = steps;
        }
    }

    await appendFile(tags.join("\n"));
}

await newHoldoutsList();
