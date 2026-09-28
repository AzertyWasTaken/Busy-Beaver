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
    let prevTape;
    let phase = 2;

    function isPaused() {
        return code.filter((sym) => sym === null).length > 2
        ? "undecided" : "halted";
    }

    while (true) {
        program.step();
        const status = program.status;
        if (status === "halted") return [isPaused(), program.steps];
        if (status !== "running") return ["undecided"];

        const tape = program.tape;

        if (prevTape && compare(prevTape, tape))
            return ["nonhalting"];

        if (program.steps >= 2**phase) {
            prevTape = tape;
            phase++;
        }
    }
}
