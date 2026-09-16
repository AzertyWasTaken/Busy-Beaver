"use strict";
import {newProgram} from "../runner.js";

function compare(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i += 2) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function decide(code, maxSteps) {
    const program = newProgram(code, maxSteps);
    const output = (status) => ({status, steps: program.steps});

    let prevQueue;
    let phase = 1;

    while (true) {
        program.step();
        const status = program.status;
        if (status === "halted") return output("halted");
        if (status !== "running") return output("undecided");

        const queue = program.queue;
        if (prevQueue && compare(prevQueue, queue))
            return output("nonhalting");

        if (program.steps >= 2**phase) {
            prevQueue = queue;
            phase++;
        }
    }
}
