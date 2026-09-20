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
    let prevString;
    let phase = 2;

    while (true) {
        program.step();
        const status = program.status;
        if (status === "halted") return ["halted", program.steps];
        if (status !== "running") return ["undecided"];

        const string = program.string;
        if (prevString && compare(prevString, string))
            return ["nonhalting"];

        if (program.steps >= 2**phase) {
            prevString = [...string];
            phase++;
        }
    }
}
