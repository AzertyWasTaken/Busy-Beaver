"use strict";
import {newProgram} from "../runner.js";

const DEC_VALUE = "negative";
const INC_VALUE = "positive";

function isUnknown(value) {
    return value === INC_VALUE || value === DEC_VALUE;
}

function isNegative(value) {
    return value === DEC_VALUE
    || value !== INC_VALUE && value < 0;
}

function hasNegative(row) {
    // An instruction with no negative value always applies, so it never halts
    return row.some((v) => isNegative(v));
}

export function enumerate(maxSize, maxSteps) {
    const code = [];
    const minIncCache = new Map();

    function getCacheKey(rowIdx, colIdx) {
        return colIdx * maxSize + rowIdx;
    }

    function* enumRow(currSize, recColumn) {
        const rowIdx = code.length - 1;
        const row = code[rowIdx];

        if (row.at(-1) === DEC_VALUE) {
            if (hasNegative(row)) yield* nextRow(currSize, recColumn);
        }

        if (currSize >= maxSize) return;

        const nextRecColumn = Math.max(recColumn, row.length + 1);
        const cacheKey = getCacheKey(rowIdx, row.length);

        // ---- Decrement ----

        row.push(DEC_VALUE);
        yield* enumRow(currSize + 1, nextRecColumn);
        row.pop();

        // ---- Ending increment ----

        minIncCache.set(cacheKey, 1);

        row.push(INC_VALUE);
        if (hasNegative(row)) yield* nextRow(currSize + 1, nextRecColumn);
        row.pop();

        // ---- Resuming increment ----

        const minValue = row.length >= recColumn ? 1 : 0;
        minIncCache.set(cacheKey, minValue);

        row.push(INC_VALUE);
        yield* enumRow(currSize + minValue, nextRecColumn);
        row.pop();

        minIncCache.delete(cacheKey);
    }

    function* revealValue(currSize, recColumn, colIdx) {
        const rowIdx = code.findIndex((row) => isUnknown(row[colIdx]));

        // No unknowns left at this column: the program is complete.
        if (rowIdx < 0) {
            yield* nextRow(currSize, recColumn);
            return;
        }

        const row = code[rowIdx];
        const cell = row[colIdx];
        const cacheKey = getCacheKey(rowIdx, colIdx);

        if (cell === DEC_VALUE) {
            const maxValue = maxSize - (currSize - 1);

            for (let value = -maxValue; value < 0; value++) {
                row[colIdx] = value;
                yield* revealValue(currSize - 1 - value, recColumn, colIdx);
            }

            row[colIdx] = DEC_VALUE;
            return;
        }

        if (cell === INC_VALUE) {
            const minValue = minIncCache.get(cacheKey);
            const maxValue = maxSize - (currSize - minValue);

            for (let value = minValue; value <= maxValue; value++) {
                row[colIdx] = value;
                yield* revealValue(currSize - minValue + value, recColumn, colIdx);
            }

            row[colIdx] = INC_VALUE;
            return;
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

        if (prog.status === "halted") {
            // Check if the code is full
            if (currSize >= maxSize) {
                if (!code.some((r) => r.some((v) => isUnknown(v))))
                    yield [code, prog.steps];
                return;
            }

            // The code is not full, so a longer program can still halt
            code.push([]);
            yield* enumRow(currSize, recColumn);
            code.pop();
            return;
        }

        // The program paused on an unknown value
        yield* revealValue(currSize, recColumn, prog.currCounter);
    }

    return nextRow(0, 1);
}
