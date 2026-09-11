"use strict";
import {newMachine} from "./runner.js";

const INCREMENT = 0;
const DECREMENT = 1;
const LOOP_OPEN = 2;
const LOOP_CLOSE = 3;

export function enumerateTNF(maxSize, maxSteps) {
    const code = [[INCREMENT, 0]];
    for (let i = 1; i < maxSize; i++) {
        code.push(null);
    }

    function nextClosingBracket(index) {
        for (let idx = index; idx < code.length; idx++) {
            const instr = code[idx];
            if (instr === null) continue;
            if (instr[0] === LOOP_CLOSE) return idx;
        }
        return code.length;
    }

    function shiftGoto(index, inc) {
        for (let idx = 0; idx < index; idx++) {
            const instr = code[idx];
            if (instr === null) continue;
            if (instr[0] === LOOP_OPEN && instr[2] >= index) instr[2] += inc;
        }
    }

    function spliceCode(index, del, ...app) {
        code.splice(index, del, ...app);
        shiftGoto(index, app.length - del);
    }

    function* nextInstruction(currSize, maxCounter, minCounter, lastInc) {
        // The code is full: every instruction is defined.
        if (currSize >= maxSize) {
            yield code;
            return;
        }

        // Run the machine until it waits on an undefined instruction.
        const machine = newMachine(code, maxSteps);
        machine.run();
        const {register, status, state} = machine.getData();

        // Exploding runs are kept as nonhalting candidates.
        if (status === "timed out") {
            yield code;
            return;
        }

        // Halting runs cannot be extended: slots the machine never reaches
        // stay undefined and are never enumerated.
        if (status !== "paused") return;

        // After a loop boundary counters may restart from zero.
        const prevType = code[state - 1][0];
        if (prevType === LOOP_OPEN || prevType === LOOP_CLOSE) {
            minCounter = 0;
            lastInc = null;
        }

        let closing = nextClosingBracket(state + 1);
        const isInLoop = closing < code.length;

        // Enumerate every possible increment / decrement.
        for (const type of [INCREMENT, DECREMENT]) {
            for (let counter = minCounter; counter <= maxCounter + 1; counter++) {
                // Do not cancel the previous increment on the same counter.
                if (type === DECREMENT && counter === lastInc) continue;
                // Skip useless decrements
                if (!isInLoop && type === DECREMENT && (register[counter] ?? 0) === 0) continue;
                // Skip increment equivalence
                if (!isInLoop && counter > 0 && (register[counter] ?? 0) === (register[counter - 1] ?? 0)) continue;

                code[state] = [type, counter];
                yield* nextInstruction(
                    currSize + 1,
                    Math.max(maxCounter, counter),
                    Math.max(minCounter, counter),
                    type === INCREMENT ? counter : null
                );
                code[state] = null;
            }
        }

        // Enumerate every possible while loop (counted as one instruction).
        // The splice shifts every later slot one to the right.
        spliceCode(state, 0, null);
        closing++;

        for (let counter = 0; counter <= maxCounter + 1; counter++) {
            // Skip useless while loops
            if (!isInLoop && (register[counter] ?? 0) === 0) continue;
            // Skip increment equivalence
            if (!isInLoop && counter > 0 && (register[counter] ?? 0) === (register[counter - 1] ?? 0)) continue;

            for (let closeIdx = state + 2; closeIdx < closing; closeIdx++) {
                // Skip trailing instructions
                if (!isInLoop) {
                    const tailLength = closing - closeIdx - 1;
                    if (tailLength > 0 && tailLength < 4) continue;
                }

                code[closeIdx] = [LOOP_CLOSE, counter, state];
                code[state] = [LOOP_OPEN, counter, closeIdx];

                yield* nextInstruction(
                    currSize + 1,
                    Math.max(maxCounter, counter),
                    0,
                    null
                );

                code[state] = null;
                code[closeIdx] = null;
            }
        }

        spliceCode(state, 1);
    }

    return nextInstruction(1, 0, 0, 0);
}
