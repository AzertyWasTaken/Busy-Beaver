"use strict";
import {newProgram} from "../runner.js";

function compare(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function decide(code, maxSteps) {
    const program = newProgram(code, maxSteps);
    let prev;
    let phase = 2;

    while (true) {
        program.step();
        const status = program.status;
        if (status === "halted") return ["halted", program.steps];
        if (status !== "running") return ["undecided"];

        const tape = program.tape;
        const state = program.state;
        const head = program.head;

        if (
            prev
            && compare(prev.tape, tape)
            && prev.state === state
            && prev.head === head
        ) return ["nonhalting"];

        if (program.steps >= 2**phase) {
            prev = {tape, state, head};
            phase++;
        }
    }
}
