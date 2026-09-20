"use strict";
import path from "node:path";
import fs from "node:fs/promises";

export function fileWriter(scriptPath, fileName, enumerate, newProgram, parse, unparse) {
    let championSteps = 0;

    function getPath(dir, ...domain) {
        return path.resolve(scriptPath, dir, fileName(...domain));
    }

    function isUndecided(code, deciders) {
        for (const decData of deciders) {
            const [decider, ...params] = Array.isArray(decData)
            ? decData : [decData];

            const [status, steps] = decider(code, ...params);

            if (steps && steps > championSteps) {
                console.log("Champion:", unparse(code), `(${steps})`);
                championSteps = steps;
            }

            if (status !== "undecided") return false;
        }

        return true;
    }

    async function createFile(filePath, content) {
        await fs.writeFile(filePath, content, "utf8");
        console.log(`Successfully created: ${filePath}`);
    }

    async function readHoldouts(domain) {
        const sourcePath = getPath("Holdouts", ...domain);
        const content = await fs.readFile(sourcePath, "utf8");
        console.log(`Successfully read: ${sourcePath}`);
        return content.replaceAll("\r", "").split("\n").filter((line) => line.length > 0);
    }

    async function writeHoldouts(canCreateFile, domain, holdouts) {
        if (canCreateFile) await createFile(getPath("", ...domain), holdouts.join("\n"));
    }

    async function newList(maxPrograms, maxSteps, canCreateFile, deciders, ...domain) {
        const holdouts = [];
        championSteps = 0;

        for (const [code, steps] of enumerate(...domain, maxSteps)) {
            if (steps) {
                if (steps > championSteps) {
                    console.log("Champion:", unparse(code), `(${steps})`);
                    championSteps = steps;
                }
                continue;
            }

            if (!isUndecided(code, deciders)) continue;

            const unparsed = unparse(code);
            console.log("Holdout:", unparsed);
            holdouts.push(unparsed);

            if (holdouts.length >= maxPrograms) {
                console.log("Maximum programs count reached!");
                break;
            }
        }

        console.log(`Total enumerated: ${holdouts.length}`);
        await writeHoldouts(canCreateFile, domain, holdouts);
    }

    async function decideList(canCreateFile, deciders, ...domain) {
        const lines = await readHoldouts(domain);
        const holdouts = [];
        championSteps = 0;

        for (const unparsed of lines) {
            if (isUndecided(parse(unparsed), deciders)) {
                holdouts.push(unparsed);
            } else {
                console.log(unparsed);
            }
        }

        console.log(`Total decided: ${lines.length - holdouts.length}`);
        await writeHoldouts(canCreateFile, domain, holdouts);
    }

    // Only checks direct deciders, not equivalence pruning.
    function reviewDecider(maxSteps, [decider, ...params], ...domain) {
        if (maxSteps === 0) return;

        for (const code of enumerate(...domain, maxSteps)) {
            const prog = newProgram(code, maxSteps);
            while (prog.status === "running") prog.step();
            if (prog.status !== "halted") continue;

            const {status, steps} = decider(code, ...params);
            if (status !== "nonhalting") continue;

            const stepsDisplay = steps ? ` (${steps})` : "";
            console.log(`False positive: ${unparse(code)}` + stepsDisplay);
        }
    }

    return {newList, decideList, reviewDecider};
}
