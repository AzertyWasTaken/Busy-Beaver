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
    const machine = newMachine(code, MAX_STEPS);
    let prev;
    let phase = 2;

    while (true) {
        for (let i = 0; i < 2; i++) {
            machine.step();
            const status = machine.getData().status;
            if (status === "halted") return true;
            if (status === "timed out") return false;
        }

        const {lTape, rTape, state, head, steps}
        = machine.getData();

        if (
            prev
            && compare(prev.lTape, lTape)
            && compare(prev.rTape, rTape)
            && prev.state === state
            && prev.head === head
        ) return true;

        if (steps >= 2**phase) {
            prev = {
                lTape: [...lTape],
                rTape: [...rTape],
                state,
                head
            };
            phase++;
        }
    }
}
