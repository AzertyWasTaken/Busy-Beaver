"use strict";
import path from "path";
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
        return path.resolve(path.join(scriptPath, dir + fileName(...domain)));
    }

    function execute(code, maxSteps) {
        // Execute the program
        const program = newProgram(code, maxSteps);
        const steps = program.run();

        // Check if the program is a champion
        if (steps > record) {
            console.log("Champion:", unparse(code), `(${steps})`);
            record = steps;
        }

        // Check if the program halted
        return steps >= 0;
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

    async function newList(maxPrograms, maxSteps, deciders, ...domain) {
        const programs = [];
        record = 0;

        for (const code of enumerate(...domain, maxSteps)) {
            if (maxSteps > 0 && execute(code, maxSteps)) continue;

            // Check if the program is not detected by any decider
            if (deciders.every((dec) => !dec(code))) {
                const unparsed = unparse(code);
                console.log("Holdout:", unparsed);
                programs.push(unparsed);

                if (programs.length >= maxPrograms) {
                    console.log("Maximum programs count reached!");
                    break;
                }
            }
        }

        const newFilePath = getPath("", ...domain);
        await createFile(newFilePath, programs.join("\n"));
    }

    async function decideList(maxSteps, deciders, ...domain) {
        const filePath = getPath("Holdouts/", ...domain);    
        const content = await readFile(filePath);
        const holdouts = content.replaceAll("\r", "").split("\n");

        const programs = [];
        let counter = 0;
        record = 0;

        for (const unparsed of holdouts) {
            const code = parse(unparsed);
            const halted = maxSteps > 0 && execute(code, maxSteps);

            // Check if the program is not detected by any decider
            if (!halted && deciders.every((dec) => !dec(code))) {
                programs.push(unparsed);
            } else {
                console.log(unparsed);
                counter++;
            }
        }

        console.log(`Total decided: ${counter}`);
        const newFilePath = getPath("", ...domain);
        await createFile(newFilePath, programs.join("\n"));
    }

    return {newList, decideList};
}
