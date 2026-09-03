"use strict";
import path from "node:path";
import fs from "node:fs/promises";

export function fileWriter(
    scriptPath,
    fileName,
    enumerate,
    newProgram,
    parse,
    unparse
) {
    let record = 0;

    function getPath(dir, ...domain) {
        return path.resolve(path.join(scriptPath, dir, fileName(...domain)));
    }

    function execute(code, maxSteps) {
        const program = newProgram(code, maxSteps);
        const steps = program.run();

        if (steps > record) {
            console.log("Champion:", unparse(code), `(${steps})`);
            record = steps;
        }

        return steps >= 0;
    }

    function isUndecided(code, maxSteps, deciders) {
        const halted = maxSteps > 0 && execute(code, maxSteps);
        return !halted && deciders.every((dec) => !dec(code));
    }

    async function createFile(filePath, content) {
        await fs.writeFile(filePath, content, "utf8");
        console.log(`Successfully created: ${filePath}`);
    }

    async function newList(maxPrograms, maxSteps, deciders, ...domain) {
        const programs = [];
        record = 0;

        for (const code of enumerate(...domain, maxSteps)) {
            if (!isUndecided(code, maxSteps, deciders)) continue;

            const unparsed = unparse(code);
            console.log("Holdout:", unparsed);
            programs.push(unparsed);

            if (programs.length >= maxPrograms) {
                console.log("Maximum programs count reached!");
                break;
            }
        }

        await createFile(getPath("", ...domain), programs.join("\n"));
    }

    async function decideList(maxSteps, deciders, ...domain) {
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

            if (isUndecided(code, maxSteps, deciders)) {
                programs.push(unparsed);
            } else {
                console.log(unparsed);
            }
        }

        console.log(`Total decided: ${holdouts.length - programs.length}`);
        await createFile(getPath("", ...domain), programs.join("\n"));
    }

    return {newList, decideList};
}
