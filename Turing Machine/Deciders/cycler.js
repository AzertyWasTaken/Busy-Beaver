"use strict";
import {newMachine} from "../runner.js";

const MAX_PERIOD = 10;
const MAX_STEPS = 1_000;

function compare(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function isCycler(code) {
    const machine = newMachine(code, MAX_STEPS);
    let history = [];

    while (true) {
        for (let i = 0; i < 2; i++) {
            const status = machine.step();
            if (status === "halted") return true;
            if (status === "timed out") return false;
        }

        const {lTape, rTape, state, head} = machine.getData();
        if (history.some((str) =>
            compare(str.lTape, lTape)
            && compare(str.rTape, rTape)
            && str.state === state
            && str.head === head
        )) return true;

        history.push({lTape: [...lTape], rTape: [...rTape], state, head});
        if (history.length > MAX_PERIOD) history.shift();
    }
}
