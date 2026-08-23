"use strict";
import fs from "node:fs/promises";
import path from "path";
import url from "url";
import {enumerate} from "./treeNormalForm.js";
import {newMachine} from "./runner.js";
import {unparse} from "./parser.js";

const STATES = 2;
const SYMBOLS = 2;
const MAX_STEPS = 100;
const MAX_MACHINES = 1_000_000;

const scriptPath = path.dirname(url.fileURLToPath(import.meta.url));
const filename = SYMBOLS > 2
? `BB(${STATES},${SYMBOLS}).txt`
: `BB(${STATES}).txt`;
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
    let machines = [];
    let record = 0;

    for (const code of enumerate(STATES, SYMBOLS, MAX_STEPS)) {
        // Execute the machine
        const machine = newMachine(code, MAX_STEPS);
        const steps = machine.run();

        // Check if the machine timed out
        if (steps < 0) {
            machines.push(unparse(code));
            if (machines.length >= MAX_MACHINES) break;
            continue;
        }

        // Check if the machine is a champion
        if (steps > record) {
            console.log("Champion:", unparse(code), `(${steps})`);
            record = steps;
        }
    }

    await appendFile(machines.join("\n"));
}

await newHoldoutsList();
