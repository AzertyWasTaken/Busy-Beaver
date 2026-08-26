"use strict";
import {newMachine} from "../runner.js";

const MAX_STEPS = 1_000;

function isMovingOut(machine) {
    const {lTape, rTape, head} = machine.getData();
    const move = machine.readInstruction()[1];

    if (head < 0) {
        if (-head - 1 >= lTape.length) return move === -1;
    } else {
        if (head >= rTape.length) return move === 1;
    }
    return false;
}

export function isSpinOut(code) {
    const machine = newMachine(code, MAX_STEPS);
    const visitedStates = new Set();

    while (true) {
        const status = machine.step();
        if (status === "halted") return true;
        if (status === "timed out") return false;

        const {state} = machine.getData();
        if (isMovingOut(machine)) {
            if (visitedStates.has(state)) return true;
            visitedStates.add(state);
        } else {
            visitedStates.clear();
        }
    }
}
