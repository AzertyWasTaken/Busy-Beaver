"use strict";
import path from "path";
import url from "url";
import {enumerate} from "./treeNormalForm.js";
import {newMachine} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {createFile, readFile} from "../writer.js";

// Deciders
import {isCycler} from "./Deciders/cycler.js";
import {isSpinOut} from "./Deciders/spinOut.js";
import {isClosedStateSet} from "./Deciders/closedStateSet.js";

const scriptPath = path.dirname(url.fileURLToPath(import.meta.url));

function getPath(states, symbols, dir = "") {    
    const fileName = symbols > 2
    ? `BB(${states},${symbols}).txt`
    : `BB(${states}).txt`;
    return path.resolve(path.join(scriptPath, dir + fileName));
}

async function enumValue() {
    const STATES = 3;
    const SYMBOLS = 2;
    const MAX_STEPS = 1_000;
    const MAX_PROGRAMS = 100_000;

    const programs = [];
    let record = 0;

    for (const code of enumerate(STATES, SYMBOLS, MAX_STEPS)) {
        // Execute the program
        const program = newMachine(code, MAX_STEPS);
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

    const newFilePath = getPath(STATES, SYMBOLS);
    await createFile(newFilePath, programs.join("\n"));
}

async function siftValue() {
    const STATES = 4;
    const SYMBOLS = 2;

    const filePath = getPath(STATES, SYMBOLS, "Holdouts/");    
    const content = await readFile(filePath);
    const holdouts = content.replaceAll("\r", "").split("\n");

    const programs = [];
    let counter = 0;

    for (const code of holdouts) {
        if (!isSpinOut(parse(code))) {
            programs.push(code);
        } else {
            console.log(code);
            counter++;
        }
    }

    console.log(`Total decided: ${counter}`);
    const newFilePath = getPath(STATES, SYMBOLS);
    await createFile(newFilePath, programs.join("\n"));
}

// await enumValue();

await siftValue();
