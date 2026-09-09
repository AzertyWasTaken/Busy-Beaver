"use strict";
import {newMachine} from "./runner.js";

export function enumerateTNF(maxSize, maxSteps) {
    function* nextInstruction(currSize, code, recCounter, minCounter, incMode) {
        function findClosingBracket(index) {
            for (let idx = index + 1; idx < code.length; idx++) {
                const element = code[idx];
                if (element && element[0] === 3) return idx;
            }
            return code.length;
        }

        // Check if the code is full
        if (currSize >= maxSize) {
            yield code;
            return;
        }

        // Run the machine until an undefined transition
        const machine = newMachine(code, maxSteps);
        machine.run();
        const {status, state} = machine.getData();

        // Check if the machine is nonhalting
        if (status === "timed out") {
            yield code;
            return;
        }

        if (status === "paused") {
            if (code[state - 1][0] === 2) {
                minCounter = 0;
                incMode = null;
            }

            // Enumerate every possible instructions
            for (let type = 0; type < 2; type++) {
                for (let counter = minCounter; counter <= recCounter + 1; counter++) {
                    if (incMode === counter && type === 1) continue;

                    code[state] = [type, counter];
                    yield* nextInstruction(
                        currSize + 1,
                        code,
                        Math.max(recCounter, counter),
                        Math.max(minCounter, counter),
                        type === 0 ? counter : null
                    );
                    code[state] = null;
                }
            }

            code.splice(state, 0, null);
            const nextClosing = findClosingBracket(state);

            // Enumerate every possible while loops
            for (let counter = 0; counter <= recCounter + 1; counter++) {
                code[state] = [2, counter];
                for (let close = state + 2; close < nextClosing; close++) {
                    code[close] = [3, counter];
                    yield* nextInstruction(
                        currSize + 1,
                        code,
                        Math.max(recCounter, counter),
                        0,
                        null
                    );
                    code[close] = null;
                }
                code[state] = null;
            }

            code.splice(state, 1);
        }
    }

    function emptyCode() {
        const code = [[0,0]];
        for (let i = 1; i < maxSize; i++) {
            code.push(null);
        }
        return code;
    }

    return nextInstruction(1, emptyCode(), 0, 0, 0);
}
