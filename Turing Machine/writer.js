"use strict";
import fs from "node:fs/promises";
import path from "path";
import url from "url";
import {enumerate} from "./enumerator.js";
import {run} from "./runner.js";
import {unparse} from "./parser.js";

const STATES = 2;
const SYMBOLS = 3;
const MAX_STEPS = 100;

const scriptPath = path.dirname(url.fileURLToPath(import.meta.url));
const filename = SYMBOLS > 2
? `BB(${STATES},${SYMBOLS}).txt`
: `BB(${STATES}).txt`;

async function writeFile(content) {
    try {
        // Overwrites the file if it exists, or creates a new one if it does not
        const filePath = path.resolve(path.join(scriptPath, filename));
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`Successfully created: ${filename}`);
    } catch (error) {
        console.error('Failed to write file:', error.message);
    }
}

const programs = [];
let record = 0;

for (const ruleSet of enumerate(STATES, SYMBOLS)) {
    const steps = run(ruleSet, MAX_STEPS);
    if (steps < 0) {
        programs.push(ruleSet);
        continue;
    }

    if (steps > record) {
        console.log("Champion:", unparse(ruleSet), `(${steps})`);
        record = steps;
    }
}

await writeFile(programs.map((i) => unparse(i)).join("\n"));
