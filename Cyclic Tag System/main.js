"use strict";
import path from "path";
import url from "url";
import {enumerate} from "./enumerator.js";
import {newTag} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {createFile, readFile} from "../writer.js";

// Deciders
import {isCycler} from "./Deciders/cycler.js";
import {isNondecreasing} from "./Deciders/nondecreasing.js";

const scriptPath = path.dirname(url.fileURLToPath(import.meta.url));

function getPath(size, dir = "") {
    const filePath = `BBCT(${size}).txt`;
    return path.resolve(path.join(scriptPath, dir + filePath));
}

async function enumValue() {
    const SIZE = 3;
    const MAX_STEPS = 1_000;
    const MAX_PROGRAMS = 100_000;

    const programs = [];
    let record = 0;

    for (const code of enumerate(SIZE)) {
        // Execute the program
        const program = newTag(code, MAX_STEPS);
        const steps = program.run();

        // Check if the program timed out
        if (steps < 0) {
            programs.push(unparse(code));
            if (programs.length >= MAX_PROGRAMS) {
                console.log("Maximum programs count reached!");
                break;
            }
            continue;
        }

        // Check if the program is a champion
        if (steps > record) {
            console.log("Champion:", unparse(code), `(${steps})`);
            record = steps;
        }
    }

    const newFilePath = getPath(SIZE);
    await createFile(newFilePath, programs.join("\n"));
}

async function siftValue() {
    const SIZE = 12;

    const filePath = getPath(SIZE, "Holdouts/");
    const content = await readFile(filePath);
    const holdouts = content.replaceAll("\r", "").split("\n");

    const programs = [];
    let counter = 0;

    for (const code of holdouts) {
        if (!isNondecreasing(parse(code))) {
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

// await enumValue();

await siftValue();
