"use strict";
import {newMachine} from "../runner.js";

const MAX_STEPS = 1_000;

function compare(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function decCycler(code) {
    const program = newMachine(code, MAX_STEPS);
    let prevRegister, prevState;
    let phase = 1;

    while (true) {
        program.step();
        const status = program.getData().status;
        if (status === "halted") return true;
        if (status === "timed out" || status === "paused") return false;

        const {register, state, steps} = program.getData();
        
        if (
            prevState === state
            && compare(prevRegister, register)
        ) return true;

        if (steps >= 2**phase) {
            prevRegister = [...register];
            prevState = state;
            phase++;
        }
    }
}
