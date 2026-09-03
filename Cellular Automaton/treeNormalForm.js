"use strict";
import {newAutomaton} from "./runner.js";

export function enumerateTNF(maxSymbol, maxSize, maxSteps) {
    function* nextRule(code, rules) {
        // Run the automaton until an undefined transition
        const automaton = newAutomaton(code, maxSteps);
        const steps = automaton.run();
        const currRule = automaton.getData().currRule;

        // Check if the automaton is nonhalting
        if (steps < 0) {
            yield code;
            return;
        }

        const rule = code[currRule];
        if (rule === null) {
            // Check if the code is full
            rules++;
            if (rules >= maxSymbol**maxSize) {
                yield code;
                return;
            }

            // Enumerate every possible canditates
            for (let i = 0; i < maxSymbol; i++) {
                code[currRule] = i;
                yield* nextRule(code, rules);
                code[currRule] = null;
            }
        }
    }

    function emptyCode() {
        const code = [maxSymbol - 1];
        for (let i = 1; i < maxSymbol**maxSize; i++) {
            code.push(null);
        }
        return code;
    }

    return nextRule(emptyCode(), 1);
}
