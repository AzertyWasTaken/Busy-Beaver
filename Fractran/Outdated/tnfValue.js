"use strict";
import {newProgram} from "../runner.js";

const DEC_INSTR = "dec";
const INC_INSTR = "inc";

function isUnknown(value) {
    return value === INC_INSTR || value === DEC_INSTR;
}

function isDecrement(value) {
    return value === DEC_INSTR
    || value !== INC_INSTR && value < 0;
}

function isRowValid(row) {
    return row.at(-1) !== 0
    && row.some((v) => isDecrement(v));
}

export function enumerate(maxSize, maxSteps) {
    const code = [[]];

    function* nextValue(currSize, recColumn) {
        const row = code.at(-1);

        // Yield the code or start a new row
        if (isRowValid(row)) yield* nextRow(currSize, recColumn);

        if (currSize >= maxSize) return;

        const nextRecCol = Math.max(recColumn, row.length);
        if (nextRecCol * 2 + 1 > maxSize) return;

        // ---- Decrement ----
        row.push(DEC_INSTR);
        yield* nextValue(currSize + 1, nextRecCol);
        row.pop();

        // ---- Zero ----
        if (recColumn >= row.length) {
            row.push(0);
            yield* nextValue(currSize, nextRecCol);
            row.pop();
        }

        // ---- Increment ----
        row.push(INC_INSTR);
        yield* nextValue(currSize + 1, nextRecCol);
        row.pop();
    }

    function* enumValue(currSize, recColumn, colIdx) {
        const rowIdx = code.findIndex((row) => isUnknown(row[colIdx]));

        // No unknowns left at this column: the program is complete.
        if (rowIdx < 0) {
            yield* nextRow(currSize, recColumn);
            return;
        }

        const row = code[rowIdx];
        const cell = row[colIdx];
        const maxValue = maxSize - (currSize - 1);

        if (cell === DEC_INSTR) {
            for (let value = -maxValue; value < 0; value++) {
                row[colIdx] = value;
                yield* enumValue(currSize - 1 - value, recColumn, colIdx);
            }

            row[colIdx] = cell;
        }

        else if (cell === INC_INSTR) {
            for (let value = 1; value <= maxValue; value++) {
                row[colIdx] = value;
                yield* enumValue(currSize - 1 + value, recColumn, colIdx);
            }

            row[colIdx] = cell;
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

        if (prog.status === "paused") {
            // The program paused on an unknown value
            yield* enumValue(currSize, recColumn, prog.currCounter);
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
