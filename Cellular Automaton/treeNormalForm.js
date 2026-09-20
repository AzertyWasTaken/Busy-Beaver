"use strict";
import {newProgram} from "./runner.js";

export function enumerate(maxSymbol, maxSize, maxSteps) {
    const code = [maxSymbol - 1];
    for (let i = 1; i < maxSymbol**maxSize; i++) {
        code.push(null);
    }

    function* nextRule(rules) {
        // Run the automaton until an undefined transition
        const prog = newProgram(code, maxSteps);
        while (prog.status === "running") prog.step();

        // Check if the automaton is nonhalting
        if (prog.status === "timed out") {
            yield [code];
            return;
        }

        yield [code, prog.steps];

        // Check if the code is full
        rules++;
        if (rules >= maxSymbol**maxSize) return;

        // Enumerate every possible canditates
        const currRule = prog.currRule;
        for (let i = 0; i < maxSymbol; i++) {
            code[currRule] = i;
            yield* nextRule(rules);
            code[currRule] = null;
        }
    }

    return nextRule(1);
}
