"use strict";
import {newMachine} from "./runner.js";

const MAX_STEPS = 1_000;

function isOutOfTape(machine) {
    const {lTape, rTape, head} = machine.getData();
    if (head < 0) {
        if (-head - 1 >= lTape.length) return -1;
    } else {
        if (head >= rTape.length) return 1;
    }
    return 0;
}

function goToSameState(machine, code, tapeSide) {
    const {state} = machine.getData();
    const symbol = machine.readCell();
    const instruction = code?.[state]?.[symbol];
    return instruction[1] === tapeSide && instruction[2] === state;
}

export function decideSpinOut(code) {
    const machine = newMachine(code, MAX_STEPS);

    while (true) {
        const status = machine.step();
        if (status === "halted") return true;
        if (status === "timed out") return false;

        const tapeSide = isOutOfTape(machine);
        if (tapeSide !== 0 && goToSameState(machine, code, tapeSide))
            return true;
    }
}
