"use strict";
import {newAutomaton} from "../runner.js";

const MAX_STEPS = 100;

function compare(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if ((a[i] ?? 0) !== (b[i] ?? 0)) return false;
    }
    return true;
}

function normalize(tape) {
    const copy = [...tape];
    while (copy.length > 0 && (copy[0] ?? 0) === 0) copy.shift();
    while (copy.length > 0 && (copy.at(-1) ?? 0) === 0) copy.pop();
    return copy;
}

export function decCycler(code) {
    const automaton = newAutomaton(code, MAX_STEPS);
    let prevTape;
    let phase = 2;

    while (true) {
        automaton.step();
        const status = automaton.getData().status;
        if (status === "halted") return true;
        if (status === "timed out") return false;

        const {tape, steps}
        = automaton.getData();

        if (
            prevTape
            && compare(
                normalize(prevTape),
                normalize(tape)
            )
        ) return true;

        if (steps >= 2**phase) {
            prevTape = [...tape];
            phase++;
        }
    }
}
