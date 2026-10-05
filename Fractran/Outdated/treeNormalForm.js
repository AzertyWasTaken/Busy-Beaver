"use strict";
import {newProgram} from "../runner.js";

function isRowValid(row) {
    return row.at(-1) !== 0
    && row.some((v) => v < 0);
}

export function enumerate(maxSize, maxSteps) {
    const code = [[]];

    function* nextValue(currSize, recColumn) {
        const row = code.at(-1);

        // Yield the code or start a new row
        if (isRowValid(row)) yield* nextRow(currSize, recColumn);

        if (currSize >= maxSize) return;

        // Extend the current row
        const remainSize = maxSize - currSize;
        const nextRecCol = Math.max(recColumn, row.length);

        for (let value = -remainSize; value <= remainSize; value++) {
            if (value === 0 && recColumn < row.length) continue;

            row.push(value);
            yield* nextValue(currSize + Math.abs(value), nextRecCol);
            row.pop();
        }
    }

    function* nextRow(currSize, recColumn) {
        // Run the program until it halts, times out, or pauses on an unknown value
        const prog = newProgram(code, maxSteps);
        while (prog.status === "running") prog.step();

        if (prog.status === "timed out") {
            yield [code];
            return;
        }

        yield [code, prog.steps];

        // Check if the code is full
        if (currSize >= maxSize) return;

        // The code is not full, so a longer program can still halt
        code.push([]);
        yield* nextValue(currSize, recColumn);
        code.pop();
    }

    return nextValue(0, 0);
}
