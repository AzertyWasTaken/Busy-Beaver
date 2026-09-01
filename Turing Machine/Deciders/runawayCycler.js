"use strict";
import {newMachine} from "../runner.js";

const MAX_STEPS = 1_000;

function isRecord(machine) {
    const {lTape, rTape, head} = machine.getData();

    if (head < 0) {
        if (-head - 1 >= lTape.length) return true;
    } else {
        if (head >= rTape.length) return true;
    }
    return false;
}

export function decRunawayCycler(code) {
    const machine = newMachine(code, MAX_STEPS);
    const visitedStates = new Set();

    while (true) {
        machine.step();
        const status = machine.getData().status;
        if (status === "halted") return true;
        if (status === "timed out") return false;

        const {state} = machine.getData();
        if (isRecord(machine)) {
            if (visitedStates.has(state)) return true;
            visitedStates.add(state);
        } else {
            visitedStates.clear();
        }
    }
}
