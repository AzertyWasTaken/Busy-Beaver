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

function normalize(lTape, rTape) {
    const copyLA = [...lTape];
    const copyRA = [...rTape];
    if (rTape.length === 0) while (copyLA.length > 0 && (copyLA[0] ?? 0) === 0) copyLA.shift();
    if (lTape.length === 0) while (copyRA.length > 0 && (copyRA[0] ?? 0) === 0) copyRA.shift();
    return [...copyLA, ...copyRA];
}

export function decCycler(code) {
    const automaton = newAutomaton(code, MAX_STEPS);
    let prev;
    let phase = 2;

    while (true) {
        automaton.step();
        const status = automaton.getData().status;
        if (status === "halted") return true;
        if (status === "timed out") return false;

        const {lTape, rTape, steps}
        = automaton.getData();

        if (
            prev
            && compare(
                normalize(prev.lTape, prev.rTape),
                normalize(lTape, rTape)
            )
        ) return true;

        if (steps >= 2**phase) {
            prev = {
                lTape: [...lTape],
                rTape: [...rTape]
            };
            phase++;
        }
    }
}
