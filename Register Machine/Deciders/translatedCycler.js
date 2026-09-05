"use strict";
import {newMachine} from "../runner.js";

const MAX_STEPS = 1_000;

function compare(a, b, zeroSet) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (
            zeroSet.has(i)
            ? a[i] !== b[i]
            : a[i] > b[i]
        ) return false;
    }
    return true;
}

export function decTranslatedCycler(code) {
    const program = newMachine(code, MAX_STEPS);
    const zeroCounter = new Set();
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
            && compare(prevRegister, register, zeroCounter)
        ) return true;

        if (steps >= 2**phase) {
            prevRegister = [...register];
            prevState = state;
            zeroCounter.clear();
            phase++;
        }

        for (let i = 0; i < register.length; i++) {
            if (register[i] === 0) zeroCounter.add(i);
        }
    }
}
