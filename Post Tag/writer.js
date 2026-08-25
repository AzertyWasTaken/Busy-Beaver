"use strict";
import fs from "node:fs/promises";
import path from "path";
import url from "url";
import {enumerate} from "./enumerator.js";
import {newTag} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {decideCycler} from "./cyclerDecider.js";

const scriptPath = path.dirname(url.fileURLToPath(import.meta.url));

function getPath(size, dir = "") {
    const filePath = `BBPT(${size}).txt`;
    return path.resolve(path.join(scriptPath, dir + filePath));
}

async function createFile(filePath, content) {
    try {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`Successfully created: ${filePath}`);
    } catch (error) {
        console.error('Failed to create file:', error.message);
    }
}

async function readFile(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        console.log(`Successfully read: ${filePath}`);
        return content;
    } catch (error) {
        console.error('Failed to read file:', error.message);
    }
}

async function enumValue() {
    const SIZE = 3;
    const MAX_STEPS = 1_000;
    const MAX_PROGRAMS = 100_000;

    const programs = [];
    let record = 0;

    for (const code of enumerate(SIZE)) {
        // Execute the tag system
        const tag = newTag(code, MAX_STEPS);
        const steps = tag.run();

        // Check if the tag system timed out
        if (steps < 0) {
            programs.push(unparse(code));
            if (programs.length >= MAX_PROGRAMS) {
                console.log("Maximum programs count reached!");
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

    const newFilePath = getPath(SIZE);
    await createFile(newFilePath, programs.join("\n"));
}

async function siftValue() {
    const SIZE = 4;

    const filePath = getPath(SIZE, "Holdouts/");
    const content = await readFile(filePath);
    const holdouts = content.replaceAll("\r", "").split("\n");

    const programs = [];
    let counter = 0;

    for (const code of holdouts) {
        if (!decideCycler(parse(code))) {
            programs.push(code);
        } else {
            console.log("Decided:", code);
            counter++;
        }
    }

    console.log(`Total decided: ${counter}`);
    const newFilePath = getPath(SIZE);
    await createFile(newFilePath, programs.join("\n"));
}

await enumValue();

// await siftValue();
