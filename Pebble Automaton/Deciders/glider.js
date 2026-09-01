"use strict";
import {newAutomaton} from "../runner.js";

const MAX_STEPS = 100;

export function decGlider(code) {
    const automaton = newAutomaton(code, MAX_STEPS);
    const leftSet = new Set(), rightSet = new Set();

    code.forEach((rule, idx) => {
        if (rule[0] === idx + 1) leftSet.add(idx + 1)
        else if (rule[1] === idx + 1) rightSet.add(idx + 1)
    });

    while (true) {
        automaton.step();
        const status = automaton.getData().status;
        if (status === "halted") return true;
        if (status === "timed out") return false;

        const {lTape, rTape} = automaton.getData();        

        if (leftSet.has(lTape.at(-1))) return true;
        if (rightSet.has(rTape.at(-1))) return true;
    }
}
