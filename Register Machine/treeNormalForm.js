"use strict";
import {newProgram} from "./runner.js";

export function enumerate(maxSize, maxSteps) {
    const code = [[0, 0, 1]];
    for (let i = 1; i < maxSize; i++) code.push(null);

    function* enumInstr(currSize, hasHalt, recCounter, recState, state) {
        // Enumerate every possible increments
        for (let counter = 0; counter <= recCounter + 1; counter++) {
            const nextRecCounter = Math.max(recCounter, counter);

            code[state] = [0, counter, null];
            yield* nextTransition(currSize + 1, hasHalt + 1, nextRecCounter, recState);

            code[state] = [1, counter, null, null];
            yield* nextTransition(currSize + 1, hasHalt + 2, nextRecCounter, recState);

            code[state] = null;
        }
    }

    function* revealValue(currSize, hasHalt, recCounter, recState, state, stateIdx) {
        const maxState = Math.min(recState + 1, maxSize - 1);

        for (let nextState = 0; nextState <= maxState; nextState++) {
            code[state][stateIdx] = nextState;
            yield* nextTransition(currSize, hasHalt - 1, recCounter, Math.max(recState, nextState));
        }
        code[state][stateIdx] = null;
    }

    function* nextTransition(currSize, hasHalt, recCounter, recState) {
        if (currSize >= maxSize && hasHalt === 0) return;

        // Run the machine until an undefined transition
        const prog = newProgram(code, maxSteps);
        while (prog.status === "running") prog.step();

        if (prog.status === "timed out") {
            yield [code];
            return;
        }

        // Check if the code is full
        if (prog.status === "halted") {
            yield [code, prog.steps];
            if (currSize >= maxSize && hasHalt === 1) return;
        }

        const state = prog.state;
        if (state === null) {
            yield* revealValue(currSize, hasHalt, recCounter, recState, prog.prevState, prog.stateIdx);
            return;
        }

        const instruction = code[state];
        if (instruction === null) {
            yield* enumInstr(currSize, hasHalt, recCounter, recState, state);
            return;
        }
    }

    return nextTransition(1, 0, 0, 1);
}
