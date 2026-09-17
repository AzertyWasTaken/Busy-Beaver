"use strict";
import path from "node:path";
import fs from "node:fs/promises";

export function fileWriter(scriptPath, fileName, enumerate, newProgram, parse, unparse) {
    let record = 0;

    function getPath(dir, ...domain) {
        return path.resolve(path.join(scriptPath, dir, fileName(...domain)));
    }

    function isUndecided(code, deciders) {
        for (const [decider, ...params] of deciders) {
            const {status, steps} = decider(code, ...params);
            if (status === "undecided") continue;

            if (status === "halted" && steps > record) {
                console.log("Champion:", unparse(code), `(${steps})`);
                record = steps;
            }
            return false;
        }
        return true;
    }

    async function createFile(filePath, content) {
        await fs.writeFile(filePath, content, "utf8");
        console.log(`Successfully created: ${filePath}`);
    }

    async function newList(maxPrograms, maxSteps, canCreateFile, deciders, ...domain) {
        const programs = [];
        record = 0;

        for (const code of enumerate(...domain, maxSteps)) {
            if (!isUndecided(code, deciders)) continue;

            const unparsed = unparse(code);
            console.log("Holdout:", unparsed);
            programs.push(unparsed);

            if (programs.length >= maxPrograms) {
                console.log("Maximum programs count reached!");
                break;
            }
        }

        console.log(`Total enumerated: ${programs.length}`);
        if (canCreateFile) await createFile(getPath("", ...domain), programs.join("\n"));
    }

    async function decideList(canCreateFile, deciders, ...domain) {
        const sourcePath = getPath("Holdouts", ...domain);
        const content = await fs.readFile(sourcePath, "utf8");
        console.log(`Successfully read: ${sourcePath}`);
        const holdouts = content
            .replaceAll("\r", "")
            .split("\n")
            .filter((line) => line.length > 0);

        const programs = [];
        record = 0;

        for (const unparsed of holdouts) {
            const code = parse(unparsed);

            if (isUndecided(code, deciders)) {
                programs.push(unparsed);
            } else {
                console.log(unparsed);
            }
        }

        console.log(`Total decided: ${holdouts.length - programs.length}`);
        if (canCreateFile) await createFile(getPath("", ...domain), programs.join("\n"));
    }

    // Currently does not work for equivalence deciders.
    function reviewDecider(maxSteps, [decider, ...params], ...domain) {
        for (const code of enumerate(...domain, maxSteps)) {
            if (maxSteps === 0) continue;

            const prog = newProgram(code, maxSteps);
            while (prog.status === "running") prog.step();
            if (prog.status !== "halted") continue;

            const {status, steps} = decider(code, ...params);
            if (status !== "nonhalting") continue;

            const unparsed = unparse(code);
            console.log(
                `False positive: ${unparsed}`
                + (steps ? ` (${steps})` : "")
            );
        }
    }

    return {newList, decideList, reviewDecider};
}
