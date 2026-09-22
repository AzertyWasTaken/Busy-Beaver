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
    let prevRegister;
    let phase = 1;

    while (true) {
        program.step();
        const status = program.status;
        if (status === "halted") return ["halted", program.steps];
        if (status !== "running") return ["undecided"];

        const register = program.register;

        if (
            prevRegister
            && compare(prevRegister, register)
        ) return ["nonhalting"];

        if (program.steps >= 2**phase) {
            prevRegister = [...register];
            phase++;
        }
    }
}
